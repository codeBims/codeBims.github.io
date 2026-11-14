-- Satu baris pada raw_transactions mewakili satu item/baris invoice.
-- Satu baris pada purchases mewakili satu invoice non-C yang lolos filter.
-- Pembatalan yang terjadi kemudian belum direkonsiliasi ke invoice asal.
DROP TABLE IF EXISTS purchases;

CREATE TABLE purchases AS
SELECT
    invoice_no,
    customer_id,
    MIN(invoice_date) AS invoice_date,
    ROUND(SUM(quantity * unit_price), 2) AS invoice_value_gbp,
    SUM(quantity) AS units,
    COUNT(*) AS item_rows
FROM raw_transactions
WHERE customer_id IS NOT NULL
  AND UPPER(invoice_no) NOT LIKE 'C%'
  AND quantity > 0
  AND unit_price > 0
GROUP BY invoice_no, customer_id;

CREATE INDEX IF NOT EXISTS purchases_customer_date
ON purchases(customer_id, invoice_date);
