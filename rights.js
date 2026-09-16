window.RENTER_RIGHTS = {
  CA: {
    name: "California",
    deadline: "The landlord must send your itemized deduction statement and refund within 21 calendar days after you move out (Cal. Civ. Code §1950.5(h)(1)).",
    inspection: "Your landlord must notify you that you can request an optional pre-move-out inspection. If you request it, it happens no earlier than 2 weeks before the end of the tenancy with at least 48 hours' written notice, and you get an itemized list of proposed deductions you can fix before moving out (§1950.5(f)).",
    caution: "If the landlord withholds in bad faith, a tenant may be able to recover up to twice the deposit amount as damages (§1950.5(m)). This tool does not provide legal advice.",
    sources: [
      { label: "Cal. Civ. Code §1950.5", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5." }
    ]
  },
  NY: {
    name: "New York",
    deadline: "The landlord must provide an itemized statement and refund within 14 days after you vacate; failing to do so forfeits the right to retain any portion of the deposit (NY Gen. Oblig. Law §7-108(1-a)(e)). Non-rent-regulated units only — rent-stabilized/controlled deposits are due at lease end or a reasonable time thereafter per the NY Attorney General's guide.",
    inspection: "The landlord must offer a pre-vacating inspection on written request 1–2 weeks before the tenancy ends, with 48 hours' notice, and provide an itemized list of repairs needed to avoid deductions (§7-108(1-a)(d)).",
    caution: "The inspection offer is waived if the tenant gives less than two weeks' notice before leaving. This tool does not provide legal advice.",
    sources: [
      { label: "NY General Obligations Law §7-108", url: "https://www.nysenate.gov/legislation/laws/GOB/7-108" },
      { label: "NY AG Residential Tenants' Rights Guide", url: "https://ag.ny.gov/publications/residential-tenants-rights-guide" }
    ]
  },
  TX: {
    name: "Texas",
    deadline: "The deposit is due on or before the 30th day after you surrender the property (Tex. Prop. Code §92.103), but the clock only starts once you give a written forwarding address (§92.107(a)). An itemized list of deductions is required when you owe no rent and the rent is uncontested (§92.104(c)).",
    inspection: "Texas statute does not require a move-out inspection; documenting condition yourself is the practical way to evidence the unit's state at surrender.",
    caution: "If you don't provide a forwarding address in writing, the deadline doesn't start — but the refund right is never forfeited (§92.107(b)). This tool does not provide legal advice.",
    sources: [
      { label: "TX State Law Library — Security Deposit Refunds", url: "https://guides.sll.texas.gov/landlord-tenant-law/security-deposit-refunds" },
      { label: "Tex. Prop. Code Ch. 92", url: "https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm" }
    ]
  },
  FL: {
    name: "Florida",
    deadline: "If the landlord makes no claim, the deposit is due within 15 days of vacating. If there is a claim, the landlord must send a written notice within 30 days (certified mail or per §83.505 e-mail), and the balance is due within 30 days of that notice (Fla. Stat. §83.49(3)).",
    inspection: "Florida statute does not mandate a move-out inspection; documenting condition yourself is the practical way to respond to any claim.",
    caution: "You have 15 days from receiving a claim notice to object in writing, or you lose the right to object. Missing the 30-day notice means the landlord forfeits the claim (§83.49(3)(a)). This tool does not provide legal advice.",
    sources: [
      { label: "Fla. Stat. §83.49", url: "https://www.flsenate.gov/Laws/Statutes/2026/83.49" }
    ]
  },
  WA: {
    name: "Washington",
    deadline: "Within 30 days of termination and vacation (or 30 days after the landlord learns of abandonment), the landlord must give a statement, documentation, and refund (RCW 59.18.280(1)(a)).",
    inspection: "A move-in checklist signed and dated by both parties is required, and the deposit cannot be withheld for damage to items not on that checklist (RCW 59.18.260(2)–(3), 59.18.280(1)(c)(iii)).",
    caution: "No carpet-cleaning charge is allowed without documented wear beyond ordinary use. Willful refusal to refund can lead to liability up to twice the deposit (59.18.280(2)). This tool does not provide legal advice.",
    sources: [
      { label: "RCW 59.18.280", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=59.18.280" },
      { label: "RCW 59.18.260", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=59.18.260" }
    ]
  },
  MA: {
    name: "Massachusetts",
    deadline: "The deposit (or balance) and any sworn itemized list of damages with cost evidence must be provided within 30 days after termination of tenancy (Mass. G.L. c.186 §15B(4)). Failure to provide the list or refund forfeits the right to retain any portion (§15B(6)(b),(e)).",
    inspection: "A Statement of Condition form must be given at move-in; the tenant has 15 days to return a corrected copy. Damage-determination inspections are allowed only in the last 30 days of tenancy or after a termination notice (§15B(1)(a)(iii), (2)(c)).",
    caution: "Move-in damage noted on the Statement of Condition generally cannot be deducted later. A tenant may be able to recover up to three times the amount withheld, plus interest and fees (§15B(7)). This tool does not provide legal advice.",
    sources: [
      { label: "Mass. G.L. c.186 §15B", url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b" },
      { label: "MA AG — Security Deposits and Last Month's Rent", url: "https://www.mass.gov/info-details/security-deposits-and-last-months-rent" }
    ]
  },
  _default: {
    name: null,
    deadline: null,
    inspection: null,
    caution: "State-specific deadlines have not been reviewed in this version. Check your state's official sources before relying on any deadline.",
    sources: [
      { label: "USA.gov — Tenant rights (routes to your state agency via HUD)", url: "https://www.usa.gov/tenant-rights" }
    ]
  }
};
