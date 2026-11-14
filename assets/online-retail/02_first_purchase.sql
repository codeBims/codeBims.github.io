-- Pilih invoice pertama yang terlihat untuk tiap pelanggan.
-- Jika dua invoice punya waktu sama, invoice_no menentukan urutan tetap.
DROP TABLE IF EXISTS first_purchases;

CREATE TABLE first_purchases AS
WITH ordered AS (
    SELECT
        customer_id,
        invoice_no,
        invoice_date,
        invoice_value_gbp,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY invoice_date, invoice_no
        ) AS purchase_order
    FROM purchases
)
SELECT
    customer_id,
    invoice_no AS first_invoice_no,
    invoice_date AS first_invoice_date,
    invoice_value_gbp AS first_invoice_value_gbp
FROM ordered
WHERE purchase_order = 1;

CREATE UNIQUE INDEX IF NOT EXISTS first_purchases_customer
ON first_purchases(customer_id);
