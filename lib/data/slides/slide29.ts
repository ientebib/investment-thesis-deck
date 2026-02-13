import type { Slide29InteractiveValueChainData } from "@/lib/data/types";

export const slide29ValueChainData: Slide29InteractiveValueChainData = {
  sectionLabel: "AI INFRASTRUCTURE",
  title: "The 12 Layers of the Stack",
  subtitle: "From raw materials to end-user access — 75+ nodes mapping every link in the infrastructure chain",
  layers: [
    {
      id: 0,
      name: "Raw Materials, Mining & Industrial Inputs",
      shortName: "Raw Materials",
      description: "Upstream extraction and processing set the physical supply ceiling for every downstream layer.",
      nodes: [
        {
          id: "1.1",
          title: "Copper Mining",
          subtitle: "ore → concentrate",
          description: "Primary copper production via open-pit/underground mining through flotation to concentrate output. Upstream capex, ore-grade decline, and water rights constrain supply growth.",
          keyPlayers: "Codelco, Freeport, BHP, Glencore"
        },
        {
          id: "1.2",
          title: "Copper Smelting & Refining",
          subtitle: "concentrate → cathode",
          description: "Pyrometallurgical conversion to blister copper and electrorefining to cathode grade. Treatment/refining charges (TC/RC) are the key midstream pricing mechanisms.",
          keyPlayers: "China ~40% share; Aurubis, Hindalco"
        },
        {
          id: "1.3",
          title: "Copper Semi-Fabrication",
          subtitle: "cathode → rod/wire/busbar/foil",
          description: "Conversion into engineered copper products for datacenter electrical distribution, transformers, connectors, and PCBs. Includes secondary recycling pathways.",
          keyPlayers: "Nexans, Prysmian, Wieland"
        },
        {
          id: "1.4",
          title: "Lithium Mining & Processing",
          subtitle: "brine/spodumene → battery-grade",
          description: "Feedstock for grid-scale and site-level BESS. Storage increasingly sits inside datacenter reliability and grid-stabilization solutions.",
          keyPlayers: "Albemarle, SQM, Pilbara, Ganfeng"
        },
        {
          id: "1.5",
          title: "Rare Earth Mining & Magnets",
          subtitle: "ore → separated oxides → NdFeB",
          description: "Nd/Pr/Dy/Tb for high-performance magnets in motors, generators, fans, and wind turbines. Separation chemistry is the chokepoint; processing is geographically concentrated.",
          keyPlayers: "Lynas, MP Materials; China ~90% processing"
        },
        {
          id: "1.6",
          title: "Uranium Fuel Cycle",
          subtitle: "yellowcake → enrichment → fuel assembly",
          description: "Full nuclear fuel cycle from mining through conversion, enrichment, and fuel assembly. Highly concentrated capacity with long lead-time constraints.",
          keyPlayers: "Cameco, Kazatomprom, Urenco, Centrus"
        },
        {
          id: "1.7",
          title: "Specialty & Compound Semi Minerals",
          subtitle: "Co/Ni/Ga/Ge/In/Ta + III-V inputs",
          description: "Many are byproducts of primary mining — supply is structurally inelastic. Directly impacts optical interconnects, solders, plating, and advanced packaging.",
          keyPlayers: "China dominates Ga/Ge refining"
        },
        {
          id: "1.8A",
          title: "Polysilicon Production",
          subtitle: "quartz → MG-Si → high-purity poly",
          description: "Quartz reduction and chlorosilane purification to electronic/solar-grade polysilicon. Power-intensive chemical plant economics dominate.",
          keyPlayers: "Wacker, Hemlock, Tongwei, Daqo"
        },
        {
          id: "1.8B",
          title: "Ingot Growth & Wafering",
          subtitle: "polysilicon → monocrystalline wafers",
          description: "Czochralski crystal growth, slicing, lapping, and polishing to semiconductor-grade wafers. Precision manufacturing yields and capacity are the binding constraints.",
          keyPlayers: "Shin-Etsu, SUMCO, Siltronic, SK Siltron"
        },
        {
          id: "1.9",
          title: "Electrical Steel & Core Materials",
          subtitle: "GOES + amorphous alloys",
          description: "Grain-oriented electrical steel as the transformer-core bottleneck. Few mills, long lead times, and qualification constraints propagate into transformer delivery delays.",
          keyPlayers: "Nippon Steel, POSCO, Baowu, AK Steel"
        },
        {
          id: "1.10A",
          title: "Bulk Industrial Gases",
          subtitle: "ASU + pipeline/bulk logistics",
          description: "O2/N2/Ar produced via air separation and delivered by pipeline or bulk liquid. Co-located infrastructure-plant economics with distinct capex and long-term contracting.",
          keyPlayers: "Linde, Air Liquide, Air Products"
        },
        {
          id: "1.10B",
          title: "Electronics Specialty Gases",
          subtitle: "ultra-high purity + dopant mixtures",
          description: "High-purity gases for deposition, etch, and clean steps plus dopants. Cylinder delivery, specialty purification, and traceability create a separate supplier universe from bulk.",
          keyPlayers: "Linde, Air Liquide, SK Materials"
        },
        {
          id: "1.11",
          title: "Bulk Construction Materials",
          subtitle: "cement / steel / aluminum / aggregates",
          description: "Massive consumption for datacenters, substations, and fab shells. Cost-significant at buildout scale even when not the gating constraint.",
          keyPlayers: "Nucor, ArcelorMittal, Holcim"
        },
        {
          id: "1.12",
          title: "Engineered Fluids & Chemicals",
          subtitle: "dielectric coolants / fluoropolymers",
          description: "Dielectric coolants for immersion and direct-to-chip systems, fluoropolymer tubing and seals. Chemistry complexity and potential PFAS restrictions can strand cooling architectures.",
          keyPlayers: "3M (Novec exit), Engineered Fluids, Chemours"
        },
        {
          id: "1.13",
          title: "Water As Industrial Input",
          subtitle: "supply / treatment / reclaim / rights",
          description: "Water for fabs, datacenters, and thermal power. Water rights acquisition and permitting constraints increasingly gate siting and expansion decisions.",
        }
      ]
    },
    {
      id: 1,
      name: "Semiconductor Equipment & Manufacturing Materials",
      shortName: "Semi Equipment",
      description: "The tool and materials ecosystem that enables chip fabrication at advanced and mature nodes.",
      nodes: [
        {
          id: "2.1",
          title: "Lithography Equipment",
          subtitle: "DUV / EUV / high-NA",
          description: "Exposure systems plus the full subsystem chain: light sources, optics, masks, stages, and alignment. Most concentrated, capex-intensive chokepoint at advanced nodes.",
          keyPlayers: "ASML (EUV monopoly), Canon, Nikon"
        },
        {
          id: "2.2",
          title: "Deposition, Etch & Process Tools",
          subtitle: "CVD / ALD / PVD / plasma etch / CMP",
          description: "Creates and patterns every device layer. Cycles with node transitions and capacity adds across leading-edge and mature fabs.",
          keyPlayers: "Applied Materials, Lam, TEL, KLA"
        },
        {
          id: "2.3",
          title: "Test, Metrology & Inspection",
          subtitle: "probe / AOI / e-beam / CD metrology",
          description: "Wafer probe, package test, burn-in, defect inspection, and overlay metrology. Tracks volume and yield-learning velocity across the fab.",
          keyPlayers: "KLA, Onto, Advantest, Teradyne"
        },
        {
          id: "2.4",
          title: "Photomask & Reticle Ecosystem",
          subtitle: "blanks / writing / inspection / repair",
          description: "Mask blanks, EUV multilayer masks, writing, inspection, repair, and pellicles. Rate-limits design iteration and yield improvement at advanced nodes.",
          keyPlayers: "Photronics, Toppan, DNP, Lasertec"
        },
        {
          id: "2.5",
          title: "Process Chemicals & Materials",
          subtitle: "resists / slurries / precursors / cleans",
          description: "Resists, CMP slurries, etchants, plating chemistries, and underfills. Qualification-lock creates sticky relationships and pricing power.",
          keyPlayers: "JSR, TOK, Entegris, Cabot, CMC Materials"
        },
        {
          id: "2.6",
          title: "EDA & Chip Design Software",
          subtitle: "RTL → GDS synthesis / P&R / verification",
          description: "Oligopolistic tooling layer gating complexity and time-to-tapeout. Includes synthesis, place-and-route, verification, timing, and IP libraries.",
          keyPlayers: "Synopsys, Cadence, Siemens EDA"
        },
        {
          id: "2.7",
          title: "Fab Facilities & Subfab",
          subtitle: "UPW / gas delivery / abatement / HVAC",
          description: "Ultrapure water, chemical delivery, exhaust abatement, cleanroom contamination control, and power quality systems. Critical infrastructure enabling tool operation.",
          keyPlayers: "Ovivo, DAS, Kinetics, Edwards"
        },
        {
          id: "2.8",
          title: "Fab Automation & MES",
          subtitle: "scheduling / dispatch / APC / FDC",
          description: "Software and integration coordinating tools, metrology loops, and scheduling so the fab operates as one system. Converts nameplate capacity into realized output.",
          keyPlayers: "Onto, PDF Solutions, Peer Group"
        },
        {
          id: "2.9",
          title: "Fab Material Logistics",
          subtitle: "AMHS / FOUPs / stockers / reticle transport",
          description: "Automated wafer and reticle movement, storage, and queueing. Distinct capex package and operational constraint separate from process tools.",
          keyPlayers: "Daifuku, Murata Machinery, Brooks"
        }
      ]
    },
    {
      id: 2,
      name: "Chip Design & Semiconductor Manufacturing",
      shortName: "Chip Design & Fab",
      description: "Silicon design, fabrication, packaging, and the device categories that populate AI infrastructure.",
      nodes: [
        {
          id: "3.1",
          title: "AI Accelerator & GPU Design",
          subtitle: "GPUs / custom ASICs / wafer-scale",
          description: "Architectures for matrix-heavy workloads: discrete GPUs, custom training/inference ASICs, FPGA acceleration. Primary driver of leading-edge wafers and advanced packaging.",
          keyPlayers: "NVIDIA, AMD, Broadcom, Google (TPU), Cerebras"
        },
        {
          id: "3.2",
          title: "CPU & General-Purpose Compute",
          subtitle: "x86 / Arm host processors",
          description: "Host processors for orchestration, I/O, and non-accelerator workloads. Includes custom server CPUs from hyperscalers alongside merchant silicon.",
          keyPlayers: "Intel, AMD, Arm, Ampere, AWS (Graviton)"
        },
        {
          id: "3.3",
          title: "Memory — DRAM & NAND",
          subtitle: "system DRAM / HBM / NAND storage",
          description: "HBM stacking and packaging complexity often binds accelerator supply. DRAM for system memory and NAND for training data I/O are both scaling with AI demand.",
          keyPlayers: "Samsung, SK Hynix, Micron"
        },
        {
          id: "3.4",
          title: "Foundry — Wafer Fabrication",
          subtitle: "FEOL / BEOL at leading & mature nodes",
          description: "Capacity constrained by tool install base, process development timelines, and yield ramp. Distinct from packaging — the front-end of chipmaking.",
          keyPlayers: "TSMC (~60%), Samsung, Intel Foundry, GlobalFoundries"
        },
        {
          id: "3.5",
          title: "OSAT & Advanced Packaging",
          subtitle: "2.5D / 3D / CoWoS / fan-out WLP",
          description: "Interposers, chip-on-wafer-on-substrate, bumping, underfill, and final test. Packaging capacity increasingly binds accelerator supply and yield.",
          keyPlayers: "TSMC (CoWoS), ASE, Amkor, JCET"
        },
        {
          id: "3.6",
          title: "Power Management & Power Semis",
          subtitle: "VRMs / GaN / SiC / gate drivers",
          description: "VRMs, DC-DC converters, PMICs, and wide-bandgap devices enabling rack power density scaling. Efficiency gains cascade into cooling and facility design.",
          keyPlayers: "Infineon, ON Semi, TI, Monolithic Power"
        },
        {
          id: "3.7",
          title: "Networking & Interconnect Silicon",
          subtitle: "switch ASICs / DPUs / SerDes / CXL",
          description: "Switch ASICs, DPUs, optical DSPs, and high-speed SerDes PHYs. Communication silicon is a first-order constraint at AI cluster scale.",
          keyPlayers: "Broadcom, Marvell, NVIDIA, Intel"
        },
        {
          id: "3.8",
          title: "Wide-Bandgap Substrates & Epi",
          subtitle: "SiC / GaN boules → wafers → epi",
          description: "Substrate and epitaxy chain gating wide-bandgap device output. Different physics, capex, yields, and supplier sets than mainstream silicon device fabrication.",
          keyPlayers: "Wolfspeed, Coherent, II-VI, STMicro"
        }
      ]
    },
    {
      id: 3,
      name: "Passive Components, Substrates & Board-Level Supply",
      shortName: "Passives & PCBs",
      description: "The component and substrate layers between bare die and assembled systems.",
      nodes: [
        {
          id: "4.1",
          title: "Passive Components",
          subtitle: "MLCCs / inductors / resistors / filters",
          description: "Ubiquitous across server boards and power paths. Demand scales linearly with each GPU/server deployment — a high-volume, low-visibility bottleneck.",
          keyPlayers: "Murata, TDK, Samsung Electro, Yageo"
        },
        {
          id: "4.2",
          title: "PCBs & Packaging Substrates",
          subtitle: "HDI / ABF substrates / glass",
          description: "High-layer server PCBs and organic build-up substrates (ABF). Substrate capacity can directly bind advanced packaging volumes at the most critical nodes.",
          keyPlayers: "Ibiden, Shinko, Unimicron, AT&S"
        },
        {
          id: "4.3",
          title: "Packaging & Thermal Materials",
          subtitle: "underfills / TIMs / die-attach / mold",
          description: "Qualification-locked materials that constrain ramp speed and yield for new packaging formats. Chemistry and process windows tighten with each generation.",
          keyPlayers: "Henkel, Namics, Indium Corp, Dow"
        },
        {
          id: "4.4",
          title: "Connectors & Internal Interconnects",
          subtitle: "high-speed / power / optical / busbars",
          description: "Signal integrity and thermal constraints intensify at higher data rates and power densities. Internal cabling and backplane design are increasingly non-trivial.",
          keyPlayers: "TE Connectivity, Amphenol, Molex, Samtec"
        }
      ]
    },
    {
      id: 4,
      name: "Hardware Systems, Storage & Integration",
      shortName: "Systems & Storage",
      description: "Where components become deployable compute, storage, and assembled infrastructure.",
      nodes: [
        {
          id: "5.1",
          title: "Server & Compute Platform Design",
          subtitle: "board / module / rack-scale architecture",
          description: "System architecture integrating boards, accelerators, interconnect topology, cooling, PSUs, and firmware. Converts components into deployable AI compute.",
          keyPlayers: "NVIDIA (DGX/HGX), Dell, HPE, Supermicro"
        },
        {
          id: "5.2",
          title: "Electronics Manufacturing Services",
          subtitle: "SMT assembly / box build / test",
          description: "High-volume assembly, testing, and logistics including specialized integration for liquid-cooled systems and dense optical assemblies.",
          keyPlayers: "Foxconn, Quanta, Wistron, Flex"
        },
        {
          id: "5.3",
          title: "Storage Systems & Platforms",
          subtitle: "controllers / parallel FS / NVMe-oF",
          description: "Enterprise storage, distributed file systems, and storage networking. Training and serving workflows are frequently I/O-bound in practice.",
          keyPlayers: "VAST Data, NetApp, DDN, Pure Storage"
        }
      ]
    },
    {
      id: 5,
      name: "Datacenter Physical Infrastructure",
      shortName: "DC Infrastructure",
      description: "Facilities, power distribution, cooling, and construction that house and sustain compute at scale.",
      nodes: [
        {
          id: "6.1",
          title: "DC Operators & Colocation",
          subtitle: "wholesale / retail / purpose-built AI",
          description: "Develop, own, and operate facilities: powered shells, wholesale/retail colocation, and purpose-built AI campuses. The real estate and operations layer consuming power and cooling at scale.",
          keyPlayers: "Equinix, Digital Realty, QTS, CoreWeave"
        },
        {
          id: "6.2A",
          title: "IT-Side Thermal Capture",
          subtitle: "direct-to-chip / immersion hardware",
          description: "Cold plates, manifolds, quick-disconnects, and immersion tanks — the immediate chip-to-coolant heat capture domain. White-space mechanical integration matters.",
          keyPlayers: "CoolIT, Vertiv, GRC, Asetek"
        },
        {
          id: "6.2B",
          title: "Coolant Distribution Units",
          subtitle: "CDUs / heat exchangers / filtration",
          description: "Secondary-loop systems bridging IT coolant to facility water loops: pumping, pressure control, heat exchange, and contamination management.",
          keyPlayers: "Vertiv, Motivair, Cooler Master"
        },
        {
          id: "6.2C",
          title: "Facility Heat Rejection",
          subtitle: "chillers / towers / dry coolers",
          description: "Heat rejection equipment optimized around supply temperatures and climate. Plant-level controls and efficiency directly impact operating costs at scale.",
          keyPlayers: "Trane, Carrier, Johnson Controls, Munters"
        },
        {
          id: "6.3A",
          title: "Power Transformers",
          subtitle: "HV/MV step-down / datacenter xfmrs",
          description: "Long-lead, component-constrained bottleneck with stringent QA/test cycles. GOES core materials and winding capacity drive multi-year lead times.",
          keyPlayers: "Hitachi Energy, Siemens, GE Vernova, WEG"
        },
        {
          id: "6.3B",
          title: "Switchgear & Protection",
          subtitle: "MV/LV breakers / ATS / relays",
          description: "MV/LV switchgear, breakers, protection interfaces, and automatic transfer switches. Different manufacturing and qualification dynamics from transformers.",
          keyPlayers: "Schneider, Eaton, ABB, Siemens"
        },
        {
          id: "6.3C",
          title: "UPS & Power Quality",
          subtitle: "UPS / static switches / conditioning",
          description: "Rotary and static UPS architectures, power conditioning, and static transfer switching. How energy storage integrates at the UPS layer defines site reliability.",
          keyPlayers: "Vertiv, Schneider, Eaton, ABB"
        },
        {
          id: "6.3D",
          title: "Downstream Distribution",
          subtitle: "PDUs / RPPs / busway / metering",
          description: "Distribution taking conditioned power to rows and racks: PDUs, RPPs, busway, panelboards, and metering/monitoring at the distribution edge.",
          keyPlayers: "Vertiv, Schneider, Legrand, ServerTech"
        },
        {
          id: "6.4",
          title: "Backup Power & Energy Storage",
          subtitle: "gensets / BESS / fuel cells",
          description: "Diesel/gas generators, battery energy storage, and fuel cells. Reliability layer enabling uptime guarantees and behind-the-meter resilience.",
          keyPlayers: "Caterpillar, Cummins, MTU, Bloom Energy"
        },
        {
          id: "6.5",
          title: "DC Construction & Commissioning",
          subtitle: "MEP / modular / prefab / Cx agents",
          description: "Mission-critical contractors, MEP design, commissioning agents, and modular providers. Skilled commissioning capacity often gates ready-for-load dates.",
          keyPlayers: "Holder, DPR, Rosendin, Compass DC"
        },
        {
          id: "6.6",
          title: "DC Ancillary Systems",
          subtitle: "fire / security / BMS / DCIM",
          description: "Fire detection/suppression, physical security, BMS/DCIM integration, leak detection, environmental sensing, and containment systems.",
          keyPlayers: "Siemens, Honeywell, Nlyte, Sunbird"
        },
        {
          id: "6.7",
          title: "Water Resource Management",
          subtitle: "cooling supply / treatment / reclaim",
          description: "Cooling-grade water supply, on-site treatment, reclaim/reuse, and discharge permitting. A siting and permitting gate distinct from cooling hardware procurement.",
        },
        {
          id: "6.8",
          title: "White-Space Infrastructure",
          subtitle: "racks / containment / cable mgmt",
          description: "Racks engineered for high-density and liquid manifolds, containment systems, cable trays, and seismic bracing. Mechanical substrate enabling dense deployments.",
          keyPlayers: "Rittal, CPI, Chatsworth, Panduit"
        },
        {
          id: "6.9",
          title: "Rack-Level Power Architecture",
          subtitle: "48V distribution / busbars / rack BBUs",
          description: "In-row/in-rack power topology: rectification shelves, 48V distribution, vertical busbars, blind-mate interfaces, and rack battery backup. Bridges facility power to boards.",
          keyPlayers: "Delta, Lite-On, Vertiv, Google (48V pioneer)"
        }
      ]
    },
    {
      id: 6,
      name: "Power Generation, Grid & Energy Infrastructure",
      shortName: "Power & Grid",
      description: "Generation, transmission, and grid infrastructure scaling to meet datacenter load growth.",
      nodes: [
        {
          id: "7.1",
          title: "Nuclear — Existing Fleet",
          subtitle: "uprates / restarts / life extensions",
          description: "Operations, uprates, license extensions, and datacenter-targeted offtake structures. Proven 24/7 low-carbon GW-scale source where available.",
          keyPlayers: "Constellation, NextEra, Talen, Southern"
        },
        {
          id: "7.2",
          title: "Nuclear — New Build & Advanced",
          subtitle: "SMRs / advanced reactors / EPC",
          description: "Small modular reactors and advanced designs. Early-stage but potentially transformative baseload for datacenter campuses.",
          keyPlayers: "NuScale, Oklo, X-energy, TerraPower, Kairos"
        },
        {
          id: "7.3",
          title: "Gas Power Generation",
          subtitle: "turbines / CHP / reciprocating engines",
          description: "Turbine manufacturing, plant development, and combined heat-and-power. Pragmatic baseload for constrained grids and behind-the-meter datacenter builds.",
          keyPlayers: "GE Vernova, Siemens Energy, Mitsubishi"
        },
        {
          id: "7.4",
          title: "Renewable Power & Equipment",
          subtitle: "solar / wind / PPAs / RECs",
          description: "Solar panels, inverters, wind turbines, and project development/operation. Driven by corporate PPAs and sustainability commitments from hyperscalers.",
          keyPlayers: "First Solar, Vestas, NextEra, AES"
        },
        {
          id: "7.5",
          title: "Geothermal Power",
          subtitle: "hydrothermal / EGS / closed-loop",
          description: "Potential 24/7 low-carbon supply with different resource and engineering constraints. Enhanced geothermal systems expanding addressable geography.",
          keyPlayers: "Ormat, Fervo Energy, Sage Geosystems"
        },
        {
          id: "7.6",
          title: "Grid Infrastructure & Transmission",
          subtitle: "HV lines / substations / FACTS",
          description: "High-voltage lines, substations, grid transformers, and stabilization equipment. AI loads can be spiky — grid upgrades and interconnection become critical constraints.",
          keyPlayers: "Hitachi Energy, Siemens, GE Grid, Quanta Svcs"
        },
        {
          id: "7.7",
          title: "Grid-Scale Power Electronics",
          subtitle: "HVDC / inverters / STATCOM / microgrid",
          description: "Utility inverters, HVDC stations, grid-forming tech, plus microgrid EMS and behind-the-meter dispatch. Industrial segment between device-level power semis and grid-scale assets.",
          keyPlayers: "Hitachi Energy, ABB, GE, Fluence, Stem"
        },
        {
          id: "7.8",
          title: "Utilities With DC Load Exposure",
          subtitle: "load growth / rate design / queues",
          description: "Utilities where datacenter demand materially changes load forecasts, capex plans, and regulatory filings. Interconnection queue dynamics and local capacity constraints matter.",
          keyPlayers: "Dominion, AEP, Duke, PJM region"
        },
        {
          id: "7.9",
          title: "Natural Gas Midstream",
          subtitle: "pipelines / processing / LNG / storage",
          description: "Fuel delivery chain scaling alongside gas generation built for datacenter load. Pipeline, compressor, and storage capacity enable behind-the-meter gas plants.",
          keyPlayers: "Williams, Kinder Morgan, Enterprise, Cheniere"
        }
      ]
    },
    {
      id: 7,
      name: "Fiber, Networking & Connectivity",
      shortName: "Fiber & Networking",
      description: "Physical and logical connectivity within, between, and beyond datacenters.",
      nodes: [
        {
          id: "8.1A",
          title: "Optical Fiber & Cable Mfg",
          subtitle: "preforms / draw tower / cable",
          description: "Preform fabrication, draw tower fiber production, and cabling. Scales physical deployment of intra- and inter-datacenter optical connectivity.",
          keyPlayers: "Corning, Prysmian, Furukawa, YOFC"
        },
        {
          id: "8.1B",
          title: "Active Photonics Components",
          subtitle: "lasers / modulators / PICs",
          description: "Light sources and photonic chips that become the core of transceivers and optical engines. Silicon photonics and compound photonics with semiconductor-like yield dynamics.",
          keyPlayers: "Coherent, Lumentum, Broadcom, Intel"
        },
        {
          id: "8.1C",
          title: "Optical Modules & Transceivers",
          subtitle: "pluggable / on-board / 800G / 1.6T",
          description: "Module-level manufacturing integrating optics and electronics. Demand shifts rapidly with 800G/1.6T ramps and AI cluster scaling.",
          keyPlayers: "Coherent, Lumentum, Innolight, Cisco"
        },
        {
          id: "8.1D",
          title: "Optical Line Systems",
          subtitle: "DWDM / transponders / ROADMs",
          description: "Metro/long-haul optical transport equipment governing inter-datacenter and backbone capacity scaling. Distinct from short-reach datacenter transceivers.",
          keyPlayers: "Ciena, Infinera, Nokia, Huawei"
        },
        {
          id: "8.2",
          title: "Networking Equipment",
          subtitle: "switches / routers / NICs / fabric",
          description: "Datacenter switches, load balancers, NICs, and white-box platforms. The physical and logical fabric inside and between facilities.",
          keyPlayers: "Arista, Cisco, Broadcom, Juniper"
        },
        {
          id: "8.3",
          title: "Submarine & Long-Haul Cables",
          subtitle: "subsea cable / repeaters / landing",
          description: "Undersea cable manufacturing and laying, subsea repeaters, and landing stations. Plus long-haul terrestrial routes connecting major datacenter markets.",
          keyPlayers: "SubCom, NEC, Alcatel Sub Networks, Google"
        },
        {
          id: "8.4",
          title: "Cybersecurity Infrastructure",
          subtitle: "network / endpoint / IAM / zero-trust",
          description: "Security, IAM, DDoS mitigation, SIEM/SOAR, and zero-trust access. AI adds model- and data-specific attack surfaces requiring new defense layers.",
          keyPlayers: "Palo Alto, CrowdStrike, Zscaler, Cloudflare"
        },
        {
          id: "8.5",
          title: "Photonics Packaging & Test",
          subtitle: "alignment / fiber coupling / auto-test",
          description: "Precision alignment, fiber coupling, electro-optical packaging, and automated test at scale. Often the cost and yield bottleneck distinct from making lasers or fiber.",
          keyPlayers: "Fabrinet, Foxconn Interconnect"
        },
        {
          id: "8.6",
          title: "Metro Fiber & Interconnection",
          subtitle: "dark fiber / carrier hotels / IX",
          description: "Campus-to-campus fiber, metro rings, dark fiber leasing, and meet-me rooms. Scales multi-site AI infrastructure differently from long-haul and subsea.",
          keyPlayers: "Zayo, Crown Castle, Coresite, DE-CIX"
        }
      ]
    },
    {
      id: 8,
      name: "Base Software, AI Compute Platforms & Training Infra",
      shortName: "Software & Compute",
      description: "The software stack from operating systems through cloud platforms that enables AI workloads.",
      nodes: [
        {
          id: "9.1",
          title: "OS, Virtualization & Containers",
          subtitle: "K8s / hypervisors / GPU passthrough",
          description: "Server OS, container orchestration, bare-metal provisioning, and GPU passthrough/vGPU. The foundational software layer managing compute resources.",
          keyPlayers: "Red Hat, Canonical, VMware, NVIDIA (MIG)"
        },
        {
          id: "9.2",
          title: "Accelerator Software Stack",
          subtitle: "drivers / compilers / runtimes / libs",
          description: "Where theoretical FLOPS become realized throughput. Driver APIs, compilers, kernel libraries, and collective communications — lock-in often lives here.",
          keyPlayers: "NVIDIA (CUDA), AMD (ROCm), Intel (oneAPI)"
        },
        {
          id: "9.3",
          title: "Cloud & AI Compute-As-A-Service",
          subtitle: "GPU instances / dedicated clouds",
          description: "GPU/accelerator instances, dedicated AI clouds, and HPC-as-a-service. Aggregates infrastructure demand and sets compute pricing for the ecosystem.",
          keyPlayers: "AWS, Azure, GCP, CoreWeave, Lambda"
        },
        {
          id: "9.4",
          title: "AI Training Frameworks & MLOps",
          subtitle: "distributed training / orchestration",
          description: "Distributed training, schedulers, experiment tracking, model registries, pipeline orchestration, and cost optimization. The operational backbone of model development.",
          keyPlayers: "PyTorch, Weights & Biases, MLflow, Ray"
        },
        {
          id: "9.5",
          title: "Data Infrastructure & Pipelines",
          subtitle: "lakes / ETL / labeling / vector DBs",
          description: "Data lakes, ETL/ELT, labeling/annotation, synthetic data systems, vector databases, and governance. Data quality and availability constrain model quality.",
          keyPlayers: "Databricks, Snowflake, Scale AI, Pinecone"
        }
      ]
    },
    {
      id: 9,
      name: "Model Development, Data & AI Research",
      shortName: "Model Development",
      description: "Where compute and data become foundation models and specialized AI capabilities.",
      nodes: [
        {
          id: "10.1",
          title: "Training Data Sourcing & Rights",
          subtitle: "crawl / licensing / privacy / provenance",
          description: "Web crawl acquisition, licensing agreements, proprietary partnerships, and privacy/compliance frameworks. Constrains the size and quality of usable training corpora.",
          keyPlayers: "Common Crawl, Reddit, Stack Exchange"
        },
        {
          id: "10.2",
          title: "Frontier Foundation Models",
          subtitle: "text / multimodal / reasoning",
          description: "The largest general-purpose models driving next-gen infrastructure demand. Single largest consumers of compute across training and increasingly inference.",
          keyPlayers: "OpenAI, Anthropic, Google DeepMind, Meta AI"
        },
        {
          id: "10.3",
          title: "Specialized & Vertical Models",
          subtitle: "healthcare / legal / code / science",
          description: "Domain-specific models for healthcare, finance, legal, robotics, code, and scientific simulation. Collectively a major driver of both training and inference demand.",
          keyPlayers: "Cohere, Mistral, Harvey, Stability AI"
        }
      ]
    },
    {
      id: 10,
      name: "AI Software, Applications & Deployment",
      shortName: "AI Applications",
      description: "Inference serving, enterprise platforms, and the application layer where AI meets end-users.",
      nodes: [
        {
          id: "11.1",
          title: "Inference Optimization & Serving",
          subtitle: "quantization / batching / KV-cache",
          description: "Quantization, pruning, distillation, serving frameworks, and KV-cache management. Translates directly to tokens-per-joule and gross margin.",
          keyPlayers: "NVIDIA (TensorRT), vLLM, Anyscale"
        },
        {
          id: "11.2",
          title: "AI Platforms & Enterprise Infra",
          subtitle: "gateways / RAG / agents / evals",
          description: "AI gateways, RAG infrastructure, agent frameworks, safety/evals, and prompt management. The middleware connecting models to enterprise workflows.",
          keyPlayers: "LangChain, LlamaIndex, Datadog, Arize"
        },
        {
          id: "11.3",
          title: "AI-Enabled SaaS & Apps",
          subtitle: "productivity / support / dev tools",
          description: "AI embedded across enterprise workflows: productivity, support, HR, finance, dev tools, and creative. Where inference demand aggregates at massive scale.",
          keyPlayers: "Microsoft (Copilot), Salesforce, ServiceNow"
        },
        {
          id: "11.4",
          title: "Enterprise AI Integration & Services",
          subtitle: "implementation / managed AI / consulting",
          description: "Implementation, managed AI services, custom deployment, and regulated-industry integration. Where a large share of enterprise AI spend actually lands.",
          keyPlayers: "Accenture, Deloitte, Palantir, C3.ai"
        }
      ]
    },
    {
      id: 11,
      name: "Distribution, Edge & End-User Access",
      shortName: "Edge & End-User",
      description: "The final mile — content delivery, edge compute, and the devices that consume AI inference.",
      nodes: [
        {
          id: "12.1",
          title: "Content Delivery & Edge Compute",
          subtitle: "CDNs / edge platforms / PoPs",
          description: "CDNs, edge inference servers, PoPs, and caching/acceleration for latency-sensitive AI workloads. Extends datacenter compute to the network edge.",
          keyPlayers: "Cloudflare, Akamai, Fastly, AWS CloudFront"
        },
        {
          id: "12.2",
          title: "End-User Devices & Edge Hardware",
          subtitle: "AI phones / PCs / NPUs / edge gateways",
          description: "Devices with NPUs integrating CPU/GPU/NPU on-chip, plus industrial edge inference appliances. On-device inference for privacy and latency-critical workloads.",
          keyPlayers: "Apple, Qualcomm, MediaTek, Intel"
        }
      ]
    }
  ],
  sourceLine:
    "Sources: IEA Critical Minerals Outlook 2025; SEMI World Fab Forecast Q1 2026; TrendForce Q2 2025; Uptime Institute Global DC Survey 2025; EIA Annual Energy Outlook 2026; public earnings (NVDA, TSMC, ASML, EQIX FY25-26)"
};
