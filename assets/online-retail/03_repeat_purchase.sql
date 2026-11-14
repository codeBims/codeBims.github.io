-- Satu baris per pelanggan kohort Januari-Juni 2011.
-- repeat_90d = 1 jika ada invoice non-C lain dalam 90 hari setelah invoice pertama.
-- Ini aktivitas invoice, bukan bukti pembelian bersih setelah retur/pembatalan.
DROP TABLE IF EXISTS repeat_90d;

CREATE TABLE repeat_90d AS
SELECT
    f.customer_id,
    f.first_invoice_no,
    f.first_invoice_date,
    f.first_invoice_value_gbp,
    CASE WHEN EXISTS (
        SELECT 1
        FROM purchases AS p
        WHERE p.customer_id = f.customer_id
          AND p.invoice_no <> f.first_invoice_no
          AND p.invoice_date > f.first_invoice_date
          AND p.invoice_date <= datetime(f.first_invoice_date, '+90 days')
    ) THEN 1 ELSE 0 END AS repeated_within_90d
FROM first_purchases AS f
WHERE f.first_invoice_date >= '2011-01-01'
  AND f.first_invoice_date < '2011-07-01';

CREATE UNIQUE INDEX IF NOT EXISTS repeat_90d_customer
ON repeat_90d(customer_id);
