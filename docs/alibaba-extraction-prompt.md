# Prompt for the Claude app — supplier data extraction

Paste everything below the line into a new chat in the Claude app.
Attach your screenshots or saved listing pages if you have them.

---

I run a pet memorial store and need to pull supplier data off 15 Alibaba
listings into one CSV. I'll paste the result into a build pipeline, so the
output format matters more than the prose.

**For each listing below, find:**

- Unit price **at the minimum order quantity** (Alibaba prices are tiered — take
  the tier you'd actually pay on a first order, not the 1000-unit price)
- The full price range across tiers, and the MOQ
- Capacity in cubic inches, or interior volume in ml/litres if that's all
  they give (I'll convert — 1 cu in = 16.387 ml)
- Product height, width, depth in inches (or cm — say which)
- Product weight in lb (or kg — say which)
- Material, and whether it's currently in stock / ready to ship

**Output one CSV code block, exactly these columns, in this order:**

```
sku,name,cost_usd,verified,moq,note,capacity_cu_in,height_in,width_in,depth_in,weight_lb,in_stock,source_url
```

**Rules that matter more than completeness:**

1. **Never guess a number.** If a listing doesn't state something, leave the
   cell **empty**. An empty cell is handled correctly downstream; a plausible
   invented number becomes a real price I charge real customers.
2. Set `verified` to `yes` **only** for rows where you actually read the price
   off the listing. If you inferred, estimated, or the page didn't load, leave
   it blank.
3. `cost_usd` is the **unit price at MOQ**, as a bare number (`18.50`, not `$18.50`).
4. Put the price range, tier breaks, and anything odd in `note`
   (e.g. `2.80–4.10, MOQ 50, ready to ship`).
5. Keep `sku` and `source_url` exactly as given below — they're how the rows
   are matched on my end.
6. If a listing won't load, output the row with `sku`, `name` and `source_url`
   filled and everything else empty, and tell me which ones failed.

**After the CSV**, tell me separately:

- Which rows you couldn't complete, and what was missing
- Whether any supplier states image-usage or reseller terms on the listing
- Anything that looks off — a price far out of line with the others, a
  suspiciously low MOQ, a capacity that doesn't match the stated dimensions

**The 15 listings:**

| sku | name | url |
|---|---|---|
| PM-STL-CYL-060 | Stillwater Steel Urn | https://www.alibaba.com/product-detail/Wholesale-Pet-Supplies-Stainless-Steel-Urns_1601313993645.html |
| PM-CER-DOM-045 | Morning Light Ceramic Urn | https://www.alibaba.com/product-detail/Modern-Eco-Friendly-Ceramic-Urn-with_1601665991491.html |
| PM-CER-BON-030 | Good Boy Bone Urn | https://www.alibaba.com/product-detail/Pet-Cremation-Bone-Ashes-Memorial-Urn_1601783662096.html |
| PM-POR-VAS-050 | Hollow Cream Porcelain Urn | https://www.alibaba.com/product-detail/Handmade-Custom-Cream-Porcelain-Eco-Friendly_1601848092808.html |
| PM-WOD-BOX-055 | Quiet Hours Memory Box | https://www.alibaba.com/product-detail/Pet-Memorial-Products-Animal-Ashes-Box_1601904256896.html |
| PM-CER-DOG-035 | Sleeping Dog Urn | https://www.alibaba.com/product-detail/Eco-Friendly-Ceramic-Dog-Shaped-Pet_1601717870739.html |
| PM-CER-VAS-040 | Long Walk Memorial Urn | https://www.alibaba.com/product-detail/Cross-border-Pet-Cremation-Urn-Memorial_1601783543273.html |
| PM-STL-CYL-025 | Small Hours Steel Urn | https://www.alibaba.com/product-detail/Stainless-Steel-Modern-Minimalism-Cylindrical-Pet_1601786812358.html |
| PM-CER-DOM-030 | Rosewater Ceramic Urn | https://www.alibaba.com/product-detail/Handmade-Modern-Pink-Ceramic-ELEVE-Pet_11000028742198.html |
| PM-STL-KEY-001 | Always With Me Keyring | https://www.alibaba.com/product-detail/Waterproof-Pet-Urn-KeyChain-Stainless-Steel_1601926958423.html |
| PM-STL-WNG-001 | Little Wings Keyring | https://www.alibaba.com/product-detail/Wings-Pet-Urn-KeyChain-Stainless-Steel_1601927017073.html |
| PM-RES-ANU-040 | Guardian Anubis Urn | https://www.alibaba.com/product-detail/Custom-Egyptian-Anubis-Dog-Memorial-Urn_1600491094231.html |
| PM-CER-ANG-015 | Angel Bone Keepsake | https://www.alibaba.com/product-detail/In-stock-Handmade-Angelic-Bone-Shaped_1601706275995.html |
| PM-BIO-SED-045 | Seedfall Biodegradable Urn | https://www.alibaba.com/product-detail/Eco-Friendly-Biodegradable-Boying-Brand-Round_1601749801879.html |
| PM-RES-CAT-025 | Bastet Cat Urn | https://www.alibaba.com/product-detail/Customized-Resin-Cat-Egyptian-Urn_1600238889477.html |

The names in that table are my storefront names, not the supplier's titles —
keep mine, and put the supplier's own title in `note` if it's usefully different.
