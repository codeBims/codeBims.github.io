-- Empat kelompok berdasarkan nilai invoice pertama, dari terendah ke tertinggi.
-- NTILE membagi jumlah pelanggan hampir sama, bukan rentang nilai GBP yang sama.
DROP TABLE IF EXISTS first_invoice_segments;

CREATE TABLE first_invoice_segments AS
SELECT
    customer_id,
    first_invoice_date,
    first_invoice_value_gbp,
    repeated_within_90d,
    NTILE(4) OVER (
        ORDER BY first_invoice_value_gbp, customer_id
    ) AS value_group
FROM repeat_90d;

CREATE UNIQUE INDEX IF NOT EXISTS first_invoice_segments_customer
ON first_invoice_segments(customer_id);
