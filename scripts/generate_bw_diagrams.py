import os

def generate_er_diagram():
    # Strict Peter Chen B&W academic notation
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2420 1840" width="100%" height="100%" style="background-color: #FFFFFF; font-family: 'Segoe UI', Arial, sans-serif;">
  <defs>
    <marker id="arrowBw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#000000" />
    </marker>
  </defs>

  <!-- ========================================================================= -->
  <!-- TOP BANNER: Standalone Academic Header (White box, 2px black border)      -->
  <!-- ========================================================================= -->
  <g transform="translate(1210, 58)">
    <rect x="-600" y="-36" width="1200" height="74" rx="4" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-8" text-anchor="middle" fill="#000000" font-size="22" font-weight="800" letter-spacing="0.5">
      DBMS CONCEPTUAL ENTITY-RELATIONSHIP (ER) DIAGRAM
    </text>
    <text y="20" text-anchor="middle" fill="#333333" font-size="13" font-weight="600" letter-spacing="0.3">
      Strict Peter Chen Notation • Formal Academic Printout Format • Experiential Learning Rulebook Compliant
    </text>
  </g>

  <!-- ========================================================================= -->
  <!-- 1. CONNECTOR LINES (Back Layer)                                           -->
  <!-- ========================================================================= -->

  <!-- DEPARTMENT Attributes Lines -->
  <line x1="340" y1="310" x2="140" y2="200" stroke="#000000" stroke-width="1.5" />
  <line x1="340" y1="270" x2="340" y2="180" stroke="#000000" stroke-width="1.5" />
  <line x1="340" y1="310" x2="540" y2="200" stroke="#000000" stroke-width="1.5" />
  <line x1="210" y1="310" x2="140" y2="310" stroke="#000000" stroke-width="1.5" />
  <line x1="340" y1="310" x2="140" y2="410" stroke="#000000" stroke-width="1.5" />
  <!-- Composite Lines on DEPARTMENT: location -> building_no, floor_level -->
  <line x1="140" y1="310" x2="25" y2="270" stroke="#000000" stroke-width="1.2" stroke-dasharray="4,3" />
  <line x1="140" y1="310" x2="25" y2="350" stroke="#000000" stroke-width="1.2" stroke-dasharray="4,3" />

  <!-- USER Attributes Lines -->
  <line x1="340" y1="720" x2="140" y2="600" stroke="#000000" stroke-width="1.5" />
  <line x1="210" y1="720" x2="140" y2="680" stroke="#000000" stroke-width="1.5" />
  <line x1="210" y1="720" x2="140" y2="760" stroke="#000000" stroke-width="1.5" />
  <line x1="340" y1="720" x2="140" y2="840" stroke="#000000" stroke-width="1.5" />
  <line x1="280" y1="760" x2="240" y2="860" stroke="#000000" stroke-width="1.5" />
  <line x1="400" y1="760" x2="440" y2="860" stroke="#000000" stroke-width="1.5" />
  <line x1="470" y1="740" x2="550" y2="790" stroke="#000000" stroke-width="1.5" />
  <!-- Composite Lines on USER: name -> first_name, last_name -->
  <line x1="140" y1="680" x2="25" y2="640" stroke="#000000" stroke-width="1.2" stroke-dasharray="4,3" />
  <line x1="140" y1="680" x2="25" y2="720" stroke="#000000" stroke-width="1.2" stroke-dasharray="4,3" />

  <!-- SPECIALIZATION Lines: USER -> <Is A> -> End_User, IT_Agent -->
  <line x1="340" y1="760" x2="340" y2="910" stroke="#000000" stroke-width="2" />
  <line x1="340" y1="955" x2="235" y2="995" stroke="#000000" stroke-width="1.8" />
  <line x1="340" y1="955" x2="445" y2="995" stroke="#000000" stroke-width="1.8" />
  <line x1="170" y1="1021" x2="120" y2="1021" stroke="#000000" stroke-width="1.4" />
  <line x1="510" y1="1021" x2="560" y2="1021" stroke="#000000" stroke-width="1.4" />

  <!-- ASSET Attributes Lines -->
  <line x1="340" y1="1400" x2="140" y2="1280" stroke="#000000" stroke-width="1.5" />
  <line x1="210" y1="1400" x2="140" y2="1360" stroke="#000000" stroke-width="1.5" />
  <line x1="210" y1="1400" x2="140" y2="1440" stroke="#000000" stroke-width="1.5" />
  <line x1="340" y1="1400" x2="140" y2="1520" stroke="#000000" stroke-width="1.5" />
  <line x1="290" y1="1440" x2="240" y2="1580" stroke="#000000" stroke-width="1.5" />
  <line x1="340" y1="1440" x2="340" y2="1580" stroke="#000000" stroke-width="1.5" />
  <line x1="390" y1="1440" x2="440" y2="1580" stroke="#000000" stroke-width="1.5" />
  <line x1="470" y1="1420" x2="540" y2="1480" stroke="#000000" stroke-width="1.5" />
  <!-- Composite Lines on ASSET: location -> rack_unit, server_room -->
  <line x1="540" y1="1480" x2="660" y2="1440" stroke="#000000" stroke-width="1.2" stroke-dasharray="4,3" />
  <line x1="540" y1="1480" x2="660" y2="1520" stroke="#000000" stroke-width="1.2" stroke-dasharray="4,3" />

  <!-- SLA_POLICY Attributes Lines -->
  <line x1="1200" y1="310" x2="980" y2="195" stroke="#000000" stroke-width="1.5" />
  <line x1="1200" y1="270" x2="1200" y2="175" stroke="#000000" stroke-width="1.5" />
  <line x1="1200" y1="310" x2="1420" y2="195" stroke="#000000" stroke-width="1.5" />
  <line x1="1070" y1="310" x2="920" y2="310" stroke="#000000" stroke-width="1.5" />
  <line x1="1330" y1="310" x2="1480" y2="310" stroke="#000000" stroke-width="1.5" />

  <!-- TICKET Attributes Lines -->
  <line x1="1060" y1="760" x2="900" y2="680" stroke="#000000" stroke-width="1.5" />
  <line x1="1090" y1="740" x2="1020" y2="640" stroke="#000000" stroke-width="1.5" />
  <line x1="1310" y1="740" x2="1380" y2="640" stroke="#000000" stroke-width="1.5" />
  <line x1="1340" y1="760" x2="1470" y2="720" stroke="#000000" stroke-width="1.5" />
  <line x1="1340" y1="805" x2="1470" y2="795" stroke="#000000" stroke-width="1.5" />
  <line x1="1060" y1="810" x2="900" y2="860" stroke="#000000" stroke-width="1.5" />
  <line x1="1110" y1="830" x2="1015" y2="900" stroke="#000000" stroke-width="1.5" />
  <line x1="1170" y1="830" x2="1140" y2="920" stroke="#000000" stroke-width="1.5" />
  <line x1="1230" y1="830" x2="1265" y2="920" stroke="#000000" stroke-width="1.5" />
  <line x1="1130" y1="830" x2="1060" y2="1000" stroke="#000000" stroke-width="1.5" stroke-dasharray="4,3" />
  <line x1="1210" y1="830" x2="1240" y2="1000" stroke="#000000" stroke-width="1.5" stroke-dasharray="4,3" />

  <!-- TICKET_AUDIT_LOG Attributes Lines -->
  <line x1="1950" y1="500" x2="1840" y2="390" stroke="#000000" stroke-width="1.5" />
  <line x1="2005" y1="500" x2="2005" y2="370" stroke="#000000" stroke-width="1.5" />
  <line x1="2070" y1="500" x2="2160" y2="390" stroke="#000000" stroke-width="1.5" />
  <line x1="2140" y1="520" x2="2220" y2="485" stroke="#000000" stroke-width="1.5" />
  <line x1="2140" y1="560" x2="2220" y2="575" stroke="#000000" stroke-width="1.5" />
  <line x1="2005" y1="584" x2="2005" y2="660" stroke="#000000" stroke-width="1.5" />

  <!-- KNOWLEDGE_BASE Attributes Lines -->
  <line x1="1950" y1="1080" x2="1840" y2="970" stroke="#000000" stroke-width="1.5" />
  <line x1="2005" y1="1080" x2="2005" y2="950" stroke="#000000" stroke-width="1.5" />
  <line x1="2070" y1="1080" x2="2170" y2="970" stroke="#000000" stroke-width="1.5" />
  <line x1="2140" y1="1100" x2="2220" y2="1065" stroke="#000000" stroke-width="1.5" />
  <line x1="2140" y1="1140" x2="2220" y2="1155" stroke="#000000" stroke-width="1.5" />
  <line x1="2060" y1="1164" x2="2120" y2="1245" stroke="#000000" stroke-width="1.5" />
  <line x1="1960" y1="1164" x2="1930" y2="1255" stroke="#000000" stroke-width="1.5" />
  <line x1="1890" y1="1164" x2="1770" y2="1210" stroke="#000000" stroke-width="1.5" />

  <!-- ========================================================================= -->
  <!-- 2. RELATIONSHIP LINES & DIAMONDS (Clean White Fill, 2px Black Stroke)     -->
  <!-- ========================================================================= -->

  <!-- Rel 1: DEPARTMENT -<Employs>- USER -->
  <line x1="340" y1="350" x2="340" y2="466" stroke="#000000" stroke-width="1.8" />
  <line x1="340" y1="534" x2="340" y2="680" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(340, 500)">
    <polygon points="0,-34 58,0 0,34 -58,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">Employs</text>
  </g>
  <text x="355" y="385" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="355" y="650" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- Rel 2: IT_AGENT / USER -<Manages>- ASSET -->
  <line x1="445" y1="1047" x2="445" y2="1180" stroke="#000000" stroke-width="1.8" />
  <line x1="445" y1="1180" x2="398" y2="1180" stroke="#000000" stroke-width="1.8" />
  <line x1="340" y1="1214" x2="340" y2="1360" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(340, 1180)">
    <polygon points="0,-34 58,0 0,34 -58,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">Manages</text>
  </g>
  <text x="455" y="1080" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="355" y="1335" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- Rel 3: USER -<Creates>- TICKET (Total Participation from Ticket: DOUBLE LINE!) -->
  <line x1="470" y1="700" x2="700" y2="640" stroke="#000000" stroke-width="1.8" />
  <!-- DOUBLE LINE connecting Ticket to <Creates> (Rulebook p.7 & 8) -->
  <line x1="820" y1="637" x2="1060" y2="757" stroke="#000000" stroke-width="1.8" />
  <line x1="820" y1="643" x2="1060" y2="763" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(760, 640)">
    <polygon points="0,-34 60,0 0,34 -60,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">Creates</text>
  </g>
  <text x="495" y="685" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="1025" y="745" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- Rel 4: USER -<Assigned_To>- TICKET -->
  <line x1="470" y1="740" x2="692" y2="780" stroke="#000000" stroke-width="1.8" stroke-dasharray="5,4" />
  <line x1="828" y1="780" x2="1060" y2="795" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(760, 780)">
    <polygon points="0,-34 68,0 0,34 -68,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5" font-weight="700">Assigned_To</text>
  </g>
  <text x="495" y="760" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="1025" y="810" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- Rel 5: SLA_POLICY -<Governs>- TICKET (Total Participation from Ticket: DOUBLE LINE!) -->
  <line x1="1200" y1="350" x2="1200" y2="476" stroke="#000000" stroke-width="1.8" />
  <!-- DOUBLE LINE connecting Ticket to <Governs> -->
  <line x1="1197" y1="544" x2="1197" y2="740" stroke="#000000" stroke-width="1.8" />
  <line x1="1203" y1="544" x2="1203" y2="740" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(1200, 510)">
    <polygon points="0,-34 58,0 0,34 -58,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">Governs</text>
  </g>
  <text x="1215" y="385" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="1215" y="715" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- Rel 6: ASSET -<Affects>- TICKET -->
  <path d="M 470, 1390 L 730, 1390 L 730, 1184" fill="none" stroke="#000000" stroke-width="1.8" />
  <path d="M 730, 1116 L 730, 830 L 1060, 830" fill="none" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(730, 1150)">
    <polygon points="0,-34 58,0 0,34 -58,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">Affects</text>
  </g>
  <text x="495" y="1375" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="1030" y="845" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- Rel 7: TICKET -<Logs>- TICKET_AUDIT_LOG (Weak Identifying: DOUBLE DIAMOND & DOUBLE LINE!) -->
  <line x1="1340" y1="775" x2="1538" y2="630" stroke="#000000" stroke-width="1.8" />
  <!-- DOUBLE LINE connecting Weak Entity to Double Diamond -->
  <line x1="1662" y1="627" x2="1870" y2="539" stroke="#000000" stroke-width="1.8" />
  <line x1="1662" y1="633" x2="1870" y2="545" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(1600, 630)">
    <!-- Outer Diamond -->
    <polygon points="0,-38 62,0 0,38 -62,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <!-- Inner Diamond (Identifying Double Diamond) -->
    <polygon points="0,-30 49,0 0,30 -49,0" fill="none" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">Logs</text>
  </g>
  <text x="1365" y="755" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="1835" y="555" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- Rel 8: TICKET -<Resolves_Via>- KNOWLEDGE_BASE -->
  <line x1="1340" y1="805" x2="1532" y2="920" stroke="#000000" stroke-width="1.8" />
  <line x1="1668" y1="920" x2="1870" y2="1100" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(1600, 920)">
    <polygon points="0,-34 68,0 0,34 -68,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5" font-weight="700">Resolves_Via</text>
  </g>
  <text x="1365" y="830" fill="#000000" font-size="15" font-weight="800">M</text>
  <text x="1835" y="1080" fill="#000000" font-size="15" font-weight="800">1</text>

  <!-- Rel 9: IT_AGENT / USER -<Authors>- KNOWLEDGE_BASE -->
  <path d="M 510, 1025 L 510, 1310 L 1536, 1310" fill="none" stroke="#000000" stroke-width="1.8" />
  <path d="M 1664, 1310 L 1930, 1310 L 1930, 1164" fill="none" stroke="#000000" stroke-width="1.8" />
  <g transform="translate(1600, 1310)">
    <polygon points="0,-34 64,0 0,34 -64,0" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">Authors</text>
  </g>
  <text x="540" y="1295" fill="#000000" font-size="15" font-weight="800">1</text>
  <text x="1890" y="1195" fill="#000000" font-size="15" font-weight="800">M</text>

  <!-- ========================================================================= -->
  <!-- 3. ENTITY RECTANGLES (Single for Strong, Double for Weak)                 -->
  <!-- ========================================================================= -->

  <!-- Entity 1: DEPARTMENT (Strong Entity) -->
  <g transform="translate(210, 270)">
    <rect width="260" height="80" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <text x="130" y="47" text-anchor="middle" fill="#000000" font-size="16" font-weight="800" letter-spacing="0.5">DEPARTMENT</text>
  </g>

  <!-- Entity 2: USER (Strong Entity with Specialization) -->
  <g transform="translate(210, 680)">
    <rect width="260" height="80" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <text x="130" y="47" text-anchor="middle" fill="#000000" font-size="16" font-weight="800" letter-spacing="0.5">USER</text>
  </g>

  <!-- DBMS SPECIALIZATION: Is-A Triangle & Sub-Entities -->
  <g transform="translate(340, 935)">
    <polygon points="0,-25 32,18 -32,18" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="10" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">Is A</text>
  </g>
  <!-- Sub-Entity 1: End_User -->
  <g transform="translate(170, 995)">
    <rect width="130" height="52" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
    <text x="65" y="32" text-anchor="middle" fill="#000000" font-size="13" font-weight="700">End_User</text>
  </g>
  <!-- Sub-Entity 2: IT_Agent -->
  <g transform="translate(380, 995)">
    <rect width="130" height="52" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
    <text x="65" y="32" text-anchor="middle" fill="#000000" font-size="13" font-weight="700">IT_Agent</text>
  </g>

  <!-- Entity 3: ASSET (Strong Entity) -->
  <g transform="translate(210, 1360)">
    <rect width="260" height="80" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <text x="130" y="47" text-anchor="middle" fill="#000000" font-size="16" font-weight="800" letter-spacing="0.5">ASSET</text>
  </g>

  <!-- Entity 4: SLA_POLICY (Strong Entity) -->
  <g transform="translate(1070, 270)">
    <rect width="260" height="80" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <text x="130" y="47" text-anchor="middle" fill="#000000" font-size="16" font-weight="800" letter-spacing="0.5">SLA_POLICY</text>
  </g>

  <!-- Entity 5: TICKET (Central Dominant Entity) -->
  <g transform="translate(1060, 740)">
    <rect width="280" height="90" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
    <text x="140" y="53" text-anchor="middle" fill="#000000" font-size="18" font-weight="800" letter-spacing="0.8">TICKET</text>
  </g>

  <!-- Entity 6: TICKET_AUDIT_LOG (Weak Entity: DOUBLE RECTANGLE!) -->
  <g transform="translate(1870, 500)">
    <!-- Outer Rectangle -->
    <rect width="270" height="84" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <!-- Inner Rectangle (Concentric Double Rectangle) -->
    <rect x="6" y="6" width="258" height="72" rx="0" fill="none" stroke="#000000" stroke-width="1.6" />
    <text x="135" y="50" text-anchor="middle" fill="#000000" font-size="15" font-weight="800" letter-spacing="0.5">TICKET_AUDIT_LOG</text>
  </g>

  <!-- Entity 7: KNOWLEDGE_BASE (Strong Entity) -->
  <g transform="translate(1870, 1080)">
    <rect width="270" height="84" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <text x="135" y="50" text-anchor="middle" fill="#000000" font-size="16" font-weight="800" letter-spacing="0.5">KNOWLEDGE_BASE</text>
  </g>

  <!-- ========================================================================= -->
  <!-- 4. ATTRIBUTE OVALS (White Fill, Black Outline & Canonical Markings)         -->
  <!-- ========================================================================= -->

  <!-- DEPARTMENT Attributes -->
  <!-- Key Attribute: dept_id (Solid Underline!) -->
  <g transform="translate(140, 200)">
    <ellipse rx="58" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="13" font-weight="800">dept_id</text>
    <line x1="-24" y1="8" x2="24" y2="8" stroke="#000000" stroke-width="1.8" />
  </g>
  <g transform="translate(340, 180)">
    <ellipse rx="62" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">dept_name</text>
  </g>
  <g transform="translate(540, 200)">
    <ellipse rx="66" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">manager_name</text>
  </g>
  <!-- COMPOSITE ATTRIBUTE: location -->
  <g transform="translate(140, 310)">
    <ellipse rx="60" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">location</text>
  </g>
  <!-- Component sub-attributes -->
  <g transform="translate(25, 270)">
    <ellipse rx="52" ry="19" fill="#FFFFFF" stroke="#000000" stroke-width="1.3" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10.5">building_no</text>
  </g>
  <g transform="translate(25, 350)">
    <ellipse rx="52" ry="19" fill="#FFFFFF" stroke="#000000" stroke-width="1.3" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10.5">floor_level</text>
  </g>
  <g transform="translate(140, 410)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">created_at</text>
  </g>

  <!-- USER Attributes -->
  <!-- Key Attribute: user_id (Solid Underline!) -->
  <g transform="translate(140, 600)">
    <ellipse rx="58" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="13" font-weight="800">user_id</text>
    <line x1="-23" y1="8" x2="23" y2="8" stroke="#000000" stroke-width="1.8" />
  </g>
  <!-- COMPOSITE ATTRIBUTE: full_name -->
  <g transform="translate(140, 680)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">full_name</text>
  </g>
  <!-- Component sub-attributes -->
  <g transform="translate(25, 640)">
    <ellipse rx="50" ry="19" fill="#FFFFFF" stroke="#000000" stroke-width="1.3" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10.5">first_name</text>
  </g>
  <g transform="translate(25, 720)">
    <ellipse rx="50" ry="19" fill="#FFFFFF" stroke="#000000" stroke-width="1.3" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10.5">last_name</text>
  </g>
  <g transform="translate(140, 760)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">email</text>
  </g>
  <g transform="translate(140, 840)">
    <ellipse rx="68" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">password_hash</text>
  </g>
  <!-- MULTIVALUED ATTRIBUTE: phone (DOUBLE OVAL!) -->
  <g transform="translate(240, 860)">
    <ellipse rx="56" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
    <ellipse rx="48" ry="18" fill="none" stroke="#000000" stroke-width="1.4" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">phone</text>
  </g>
  <g transform="translate(440, 860)">
    <ellipse rx="50" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">role</text>
  </g>
  <g transform="translate(550, 790)">
    <ellipse rx="52" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">is_active</text>
  </g>
  <!-- Specialization Sub-attributes -->
  <g transform="translate(120, 1021)">
    <ellipse rx="56" ry="20" fill="#FFFFFF" stroke="#000000" stroke-width="1.4" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">desk_number</text>
  </g>
  <g transform="translate(560, 1021)">
    <ellipse rx="54" ry="20" fill="#FFFFFF" stroke="#000000" stroke-width="1.4" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">tier_level</text>
  </g>

  <!-- ASSET Attributes -->
  <!-- Key Attribute: asset_id (Solid Underline!) -->
  <g transform="translate(140, 1280)">
    <ellipse rx="58" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="13" font-weight="800">asset_id</text>
    <line x1="-24" y1="8" x2="24" y2="8" stroke="#000000" stroke-width="1.8" />
  </g>
  <g transform="translate(140, 1360)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">asset_tag</text>
  </g>
  <g transform="translate(140, 1440)">
    <ellipse rx="62" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">asset_name</text>
  </g>
  <g transform="translate(140, 1520)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">asset_type</text>
  </g>
  <g transform="translate(240, 1580)">
    <ellipse rx="50" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">status</text>
  </g>
  <g transform="translate(340, 1580)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">ip_address</text>
  </g>
  <g transform="translate(440, 1580)">
    <ellipse rx="52" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">criticality</text>
  </g>
  <!-- COMPOSITE ATTRIBUTE: location -->
  <g transform="translate(540, 1480)">
    <ellipse rx="60" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">location</text>
  </g>
  <g transform="translate(660, 1440)">
    <ellipse rx="54" ry="19" fill="#FFFFFF" stroke="#000000" stroke-width="1.3" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10.5">rack_unit</text>
  </g>
  <g transform="translate(660, 1520)">
    <ellipse rx="56" ry="19" fill="#FFFFFF" stroke="#000000" stroke-width="1.3" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10.5">server_room</text>
  </g>

  <!-- SLA_POLICY Attributes -->
  <!-- Key Attribute: sla_id (Solid Underline!) -->
  <g transform="translate(980, 195)">
    <ellipse rx="54" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="13" font-weight="800">sla_id</text>
    <line x1="-20" y1="8" x2="20" y2="8" stroke="#000000" stroke-width="1.8" />
  </g>
  <g transform="translate(1200, 175)">
    <ellipse rx="66" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">priority_level</text>
  </g>
  <g transform="translate(1420, 195)">
    <ellipse rx="72" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">response_time</text>
  </g>
  <g transform="translate(1480, 310)">
    <ellipse rx="72" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">resolution_time</text>
  </g>
  <g transform="translate(920, 310)">
    <ellipse rx="72" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">escalation_hours</text>
  </g>

  <!-- TICKET Attributes -->
  <!-- Key Attribute: ticket_id (Solid Underline!) -->
  <g transform="translate(900, 680)">
    <ellipse rx="58" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="13" font-weight="800">ticket_id</text>
    <line x1="-26" y1="8" x2="26" y2="8" stroke="#000000" stroke-width="1.8" />
  </g>
  <g transform="translate(1020, 640)">
    <ellipse rx="62" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">ticket_code</text>
  </g>
  <g transform="translate(1380, 640)">
    <ellipse rx="52" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">title</text>
  </g>
  <g transform="translate(1470, 720)">
    <ellipse rx="52" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">due_date</text>
  </g>
  <g transform="translate(1470, 795)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">resolved_at</text>
  </g>
  <g transform="translate(900, 860)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">description</text>
  </g>
  <g transform="translate(1015, 900)">
    <ellipse rx="52" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">category</text>
  </g>
  <g transform="translate(1140, 920)">
    <ellipse rx="50" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">priority</text>
  </g>
  <g transform="translate(1265, 920)">
    <ellipse rx="50" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">status</text>
  </g>
  <!-- DERIVED ATTRIBUTE: sla_breached (DASHED OVAL!) -->
  <g transform="translate(1060, 1000)">
    <ellipse rx="68" ry="23" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" stroke-dasharray="5,4" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12" font-weight="700">sla_breached</text>
  </g>
  <!-- DERIVED ATTRIBUTE: hours_remaining (DASHED OVAL!) -->
  <g transform="translate(1240, 1000)">
    <ellipse rx="72" ry="23" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" stroke-dasharray="5,4" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5" font-weight="700">hours_remaining</text>
  </g>

  <!-- TICKET_AUDIT_LOG Attributes -->
  <!-- PARTIAL KEY / DISCRIMINATOR: log_id (DASHED UNDERLINE!) -->
  <g transform="translate(1840, 390)">
    <ellipse rx="56" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="13" font-weight="800">log_id</text>
    <line x1="-22" y1="8" x2="22" y2="8" stroke="#000000" stroke-width="1.8" stroke-dasharray="3,2" />
  </g>
  <g transform="translate(2005, 370)">
    <ellipse rx="62" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">action_type</text>
  </g>
  <g transform="translate(2160, 390)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">old_status</text>
  </g>
  <g transform="translate(2220, 485)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">new_status</text>
  </g>
  <g transform="translate(2220, 575)">
    <ellipse rx="54" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">comment</text>
  </g>
  <g transform="translate(2005, 660)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">logged_at</text>
  </g>

  <!-- KNOWLEDGE_BASE Attributes -->
  <!-- Key Attribute: kb_id (Solid Underline!) -->
  <g transform="translate(1840, 970)">
    <ellipse rx="54" ry="24" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="13" font-weight="800">kb_id</text>
    <line x1="-20" y1="8" x2="20" y2="8" stroke="#000000" stroke-width="1.8" />
  </g>
  <g transform="translate(2005, 950)">
    <ellipse rx="52" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">title</text>
  </g>
  <g transform="translate(2170, 970)">
    <ellipse rx="54" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="12">category</text>
  </g>
  <g transform="translate(2220, 1065)">
    <ellipse rx="58" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11.5">keywords</text>
  </g>
  <g transform="translate(2220, 1155)">
    <ellipse rx="72" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">prob_summary</text>
  </g>
  <g transform="translate(2120, 1245)">
    <ellipse rx="72" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">resolution_steps</text>
  </g>
  <g transform="translate(1930, 1255)">
    <ellipse rx="68" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="10.5">applicable_asset</text>
  </g>
  <g transform="translate(1770, 1210)">
    <ellipse rx="68" ry="22" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
    <text y="5" text-anchor="middle" fill="#000000" font-size="11">vector_sample</text>
  </g>

  <!-- ========================================================================= -->
  <!-- 5. STANDARDIZED SYMBOL LEGEND TABLE (Peter Chen Rulebook Compliant)       -->
  <!-- ========================================================================= -->
  <g transform="translate(750, 1370)">
    <rect width="920" height="410" rx="4" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    
    <!-- Legend Header -->
    <rect width="920" height="44" rx="0" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="460" y="28" text-anchor="middle" fill="#000000" font-size="14.5" font-weight="800" letter-spacing="0.5">
      STANDARDIZED DBMS ER NOTATION GUIDE (PETER CHEN CANONICAL RULES)
    </text>

    <!-- Column 1 -->
    <!-- Item 1: Strong Entity -->
    <g transform="translate(40, 68)">
      <rect width="70" height="28" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
      <text x="35" y="18" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">Entity</text>
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Rectangle:</tspan> Strong Entity Set</text>
    </g>

    <!-- Item 2: Weak Entity -->
    <g transform="translate(40, 116)">
      <rect width="70" height="28" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
      <rect x="4" y="4" width="62" height="20" fill="none" stroke="#000000" stroke-width="1.4" />
      <text x="35" y="18" text-anchor="middle" fill="#000000" font-size="9.5" font-weight="700">Weak</text>
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Double Rect:</tspan> Weak Entity Set</text>
    </g>

    <!-- Item 3: Relationship Set -->
    <g transform="translate(40, 164)">
      <polygon points="0,-14 24,0 0,14 -24,0" transform="translate(35, 14)" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Diamond:</tspan> Relationship Set</text>
    </g>

    <!-- Item 4: Identifying Relationship -->
    <g transform="translate(40, 212)">
      <polygon points="0,-16 26,0 0,16 -26,0" transform="translate(35, 14)" fill="#FFFFFF" stroke="#000000" stroke-width="1.6" />
      <polygon points="0,-11 18,0 0,11 -18,0" transform="translate(35, 14)" fill="none" stroke="#000000" stroke-width="1.3" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Double Diamond:</tspan> Identifying Rel.</text>
    </g>

    <!-- Item 5: Total Participation -->
    <g transform="translate(40, 260)">
      <line x1="8" y1="11" x2="62" y2="11" stroke="#000000" stroke-width="2" />
      <line x1="8" y1="17" x2="62" y2="17" stroke="#000000" stroke-width="2" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Double Line:</tspan> Total Participation</text>
    </g>

    <!-- Item 6: Cardinality Ratio -->
    <g transform="translate(40, 308)">
      <text x="35" y="20" text-anchor="middle" fill="#000000" font-size="15" font-weight="800">1 : M</text>
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">1, M, N:</tspan> Cardinality Ratio</text>
    </g>

    <!-- Column 2 -->
    <!-- Item 7: Key Attribute -->
    <g transform="translate(480, 68)">
      <ellipse cx="35" cy="14" rx="28" ry="13" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
      <text x="35" y="18" text-anchor="middle" fill="#000000" font-size="9.5" font-weight="800">PK</text>
      <line x1="24" y1="20" x2="46" y2="20" stroke="#000000" stroke-width="1.4" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Underline Oval:</tspan> Primary Key (PK)</text>
    </g>

    <!-- Item 8: Partial Key / Discriminator -->
    <g transform="translate(480, 116)">
      <ellipse cx="35" cy="14" rx="28" ry="13" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
      <text x="35" y="18" text-anchor="middle" fill="#000000" font-size="9" font-weight="800">Partial</text>
      <line x1="20" y1="20" x2="50" y2="20" stroke="#000000" stroke-width="1.3" stroke-dasharray="2,2" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Dashed Underline:</tspan> Partial Key</text>
    </g>

    <!-- Item 9: Composite Attribute -->
    <g transform="translate(480, 164)">
      <ellipse cx="22" cy="14" rx="18" ry="10" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
      <line x1="38" y1="14" x2="50" y2="8" stroke="#000000" stroke-width="1.2" />
      <line x1="38" y1="14" x2="50" y2="20" stroke="#000000" stroke-width="1.2" />
      <ellipse cx="58" cy="8" rx="8" ry="5" fill="#FFFFFF" stroke="#000000" stroke-width="1" />
      <ellipse cx="58" cy="20" rx="8" ry="5" fill="#FFFFFF" stroke="#000000" stroke-width="1" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Branching Oval:</tspan> Composite Attr.</text>
    </g>

    <!-- Item 10: Multivalued Attribute -->
    <g transform="translate(480, 212)">
      <ellipse cx="35" cy="14" rx="30" ry="13" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
      <ellipse cx="35" cy="14" rx="24" ry="9" fill="none" stroke="#000000" stroke-width="1.3" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Double Oval:</tspan> Multivalued (phone)</text>
    </g>

    <!-- Item 11: Derived Attribute -->
    <g transform="translate(480, 260)">
      <ellipse cx="35" cy="14" rx="30" ry="13" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" stroke-dasharray="4,3" />
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Dashed Oval:</tspan> Derived (sla_breached)</text>
    </g>

    <!-- Item 12: Specialization / Generalization -->
    <g transform="translate(480, 308)">
      <polygon points="0,-12 16,8 -16,8" transform="translate(35, 14)" fill="#FFFFFF" stroke="#000000" stroke-width="1.6" />
      <text x="35" y="19" text-anchor="middle" fill="#000000" font-size="7.5" font-weight="800">Is A</text>
      <text x="85" y="19" fill="#000000" font-size="12"><tspan font-weight="700">Is A Triangle:</tspan> Specialization</text>
    </g>

    <!-- Bottom Reference Note -->
    <line x1="20" y1="360" x2="900" y2="360" stroke="#CCCCCC" stroke-width="1.2" />
    <text x="460" y="388" text-anchor="middle" fill="#555555" font-size="12" font-style="italic">
      Course Standard: Entity sets, Weak entities, Attributes, Cardinalities, and Specialization (Chen 1976 / Silberschatz 7th Ed.)
    </text>
  </g>

</svg>'''
    return svg

def generate_relational_schema():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1960 1380" width="100%" height="100%" style="background-color: #FFFFFF; font-family: 'Segoe UI', Arial, sans-serif;">
  <defs>
    <marker id="fkArrowBw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#000000" />
    </marker>
  </defs>

  <!-- ========================================================================= -->
  <!-- TOP BANNER (White box, 2px black border)                                  -->
  <!-- ========================================================================= -->
  <g transform="translate(980, 57)">
    <rect x="-600" y="-35" width="1200" height="72" rx="4" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-8" text-anchor="middle" fill="#000000" font-size="22" font-weight="800" letter-spacing="0.5">
      RELATIONAL SCHEMA DIAGRAM (3NF NORMALIZATION)
    </text>
    <text y="20" text-anchor="middle" fill="#333333" font-size="13" font-weight="600" letter-spacing="0.3">
      Formal Table Mappings • Underlined Primary Keys (PK) • Directed Foreign Key Referential Integrity Constraints
    </text>
  </g>

  <!-- ========================================================================= -->
  <!-- FOREIGN KEY REFERENTIAL ARROWS (Curved Bezier Routes with B&W Action Tags) -->
  <!-- ========================================================================= -->

  <!-- FK 1: USERS.dept_id -> DEPARTMENTS.dept_id (RESTRICT) -->
  <path d="M 400, 566 C 480, 566 480, 208 400, 208" fill="none" stroke="#000000" stroke-width="1.8" marker-end="url(#fkArrowBw)" />
  <g transform="translate(490, 387)">
    <rect x="-70" y="-12" width="140" height="24" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">ON DELETE RESTRICT</text>
  </g>

  <!-- FK 2: ASSETS.owner_id -> USERS.user_id (SET NULL) -->
  <path d="M 400, 988 C 510, 988 510, 448 400, 448" fill="none" stroke="#000000" stroke-width="1.8" marker-end="url(#fkArrowBw)" />
  <g transform="translate(520, 718)">
    <rect x="-70" y="-12" width="140" height="24" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">ON DELETE SET NULL</text>
  </g>

  <!-- FK 3: TICKETS.created_by -> USERS.user_id (RESTRICT) -->
  <path d="M 760, 630 C 620, 630 620, 448 400, 448" fill="none" stroke="#000000" stroke-width="1.8" marker-end="url(#fkArrowBw)" />
  <g transform="translate(580, 539)">
    <rect x="-70" y="-12" width="140" height="24" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">ON DELETE RESTRICT</text>
  </g>

  <!-- FK 4: TICKETS.assigned_to -> USERS.user_id (SET NULL) -->
  <path d="M 760, 652 C 600, 652 600, 458 400, 458" fill="none" stroke="#000000" stroke-width="1.6" stroke-dasharray="5,4" marker-end="url(#fkArrowBw)" />
  <g transform="translate(590, 580)">
    <rect x="-70" y="-12" width="140" height="24" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">ON DELETE SET NULL</text>
  </g>

  <!-- FK 5: TICKETS.asset_id -> ASSETS.asset_id (SET NULL) -->
  <path d="M 760, 608 C 610, 608 610, 808 400, 808" fill="none" stroke="#000000" stroke-width="1.8" marker-end="url(#fkArrowBw)" />
  <g transform="translate(570, 770)">
    <rect x="-70" y="-12" width="140" height="24" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">ON DELETE SET NULL</text>
  </g>

  <!-- FK 6: TICKETS.priority -> SLA_POLICIES.priority_level (GOVERNS) -->
  <path d="M 950, 390 L 950, 320" fill="none" stroke="#000000" stroke-width="1.8" marker-end="url(#fkArrowBw)" />
  <g transform="translate(950, 355)">
    <rect x="-65" y="-11" width="130" height="22" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="9.5" font-weight="700">SLA GOVERNANCE</text>
  </g>

  <!-- FK 7: TICKET_AUDIT_LOG.ticket_id -> TICKETS.ticket_id (CASCADE) -->
  <path d="M 1480, 474 C 1310, 474 1310, 448 1140, 448" fill="none" stroke="#000000" stroke-width="1.8" marker-end="url(#fkArrowBw)" />
  <g transform="translate(1310, 461)">
    <rect x="-70" y="-12" width="140" height="24" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">ON DELETE CASCADE</text>
  </g>

  <!-- FK 8: TICKET_AUDIT_LOG.changed_by -> USERS.user_id (SET NULL) -->
  <path d="M 1480, 586 L 1380, 586 C 1330, 586 1330, 740 1200, 740 L 710, 740 C 580, 740 580, 468 400, 468" fill="none" stroke="#000000" stroke-width="1.6" stroke-dasharray="5,4" marker-end="url(#fkArrowBw)" />
  <g transform="translate(1290, 740)">
    <rect x="-70" y="-12" width="140" height="24" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text y="4" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">ON DELETE SET NULL</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TABLE 1: DEPARTMENTS (x: 60, y: 150, w: 340, h: 170)                      -->
  <!-- ========================================================================= -->
  <g transform="translate(60, 150)">
    <rect width="340" height="170" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="340" height="38" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="170" y="24" text-anchor="middle" fill="#000000" font-size="14" font-weight="800" letter-spacing="0.5">DEPARTMENTS</text>
    
    <!-- Row 1: PK dept_id -->
    <text x="16" y="60" fill="#000000" font-size="12.5" font-family="monospace" font-weight="800">PK dept_id</text>
    <line x1="16" y1="64" x2="105" y2="64" stroke="#000000" stroke-width="1.8" />
    <text x="195" y="60" fill="#4B5563" font-size="11.5" font-family="monospace">INT AUTO_INC</text>
    <line x1="12" y1="72" x2="328" y2="72" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="92" fill="#000000" font-size="12" font-family="monospace">dept_name</text>
    <text x="195" y="92" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(100) UK</text>

    <text x="16" y="116" fill="#000000" font-size="12" font-family="monospace">manager_name</text>
    <text x="195" y="116" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(100)</text>

    <text x="16" y="140" fill="#000000" font-size="12" font-family="monospace">building_location</text>
    <text x="195" y="140" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(100)</text>

    <text x="16" y="162" fill="#4B5563" font-size="11" font-family="monospace">created_at</text>
    <text x="195" y="162" fill="#6B7280" font-size="11" font-family="monospace">TIMESTAMP</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TABLE 2: USERS (x: 60, y: 390, w: 340, h: 280)                            -->
  <!-- ========================================================================= -->
  <g transform="translate(60, 390)">
    <rect width="340" height="280" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="340" height="38" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="170" y="24" text-anchor="middle" fill="#000000" font-size="14" font-weight="800" letter-spacing="0.5">USERS</text>
    
    <!-- Row 1: PK user_id -->
    <text x="16" y="60" fill="#000000" font-size="12.5" font-family="monospace" font-weight="800">PK user_id</text>
    <line x1="16" y1="64" x2="105" y2="64" stroke="#000000" stroke-width="1.8" />
    <text x="195" y="60" fill="#4B5563" font-size="11.5" font-family="monospace">INT AUTO_INC</text>
    <line x1="12" y1="72" x2="328" y2="72" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="90" fill="#000000" font-size="12" font-family="monospace">full_name</text>
    <text x="195" y="90" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(100)</text>

    <text x="16" y="112" fill="#000000" font-size="12" font-family="monospace">email</text>
    <text x="195" y="112" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(150) UK</text>

    <text x="16" y="134" fill="#000000" font-size="12" font-family="monospace">role</text>
    <text x="195" y="134" fill="#4B5563" font-size="11.5" font-family="monospace">ENUM(Admin,Agent,Emp)</text>

    <!-- Row: FK dept_id -->
    <text x="16" y="156" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK dept_id</text>
    <text x="195" y="156" fill="#4B5563" font-size="11.5" font-family="monospace">INT NOT NULL</text>
    <line x1="12" y1="164" x2="328" y2="164" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="184" fill="#000000" font-size="12" font-family="monospace">phone</text>
    <text x="195" y="184" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(20)</text>

    <text x="16" y="206" fill="#000000" font-size="12" font-family="monospace">is_active</text>
    <text x="195" y="206" fill="#4B5563" font-size="11.5" font-family="monospace">BOOLEAN DEFAULT 1</text>

    <text x="16" y="228" fill="#4B5563" font-size="11" font-family="monospace">created_at</text>
    <text x="195" y="228" fill="#6B7280" font-size="11" font-family="monospace">TIMESTAMP</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TABLE 3: ASSETS (x: 60, y: 740, w: 340, h: 290)                           -->
  <!-- ========================================================================= -->
  <g transform="translate(60, 740)">
    <rect width="340" height="290" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="340" height="38" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="170" y="24" text-anchor="middle" fill="#000000" font-size="14" font-weight="800" letter-spacing="0.5">ASSETS</text>
    
    <!-- Row 1: PK asset_id -->
    <text x="16" y="60" fill="#000000" font-size="12.5" font-family="monospace" font-weight="800">PK asset_id</text>
    <line x1="16" y1="64" x2="115" y2="64" stroke="#000000" stroke-width="1.8" />
    <text x="195" y="60" fill="#4B5563" font-size="11.5" font-family="monospace">INT AUTO_INC</text>
    <line x1="12" y1="72" x2="328" y2="72" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="90" fill="#000000" font-size="12" font-family="monospace">asset_tag</text>
    <text x="195" y="90" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(50) UK</text>

    <text x="16" y="112" fill="#000000" font-size="12" font-family="monospace">asset_name</text>
    <text x="195" y="112" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(100)</text>

    <text x="16" y="134" fill="#000000" font-size="12" font-family="monospace">asset_type</text>
    <text x="195" y="134" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(50)</text>

    <text x="16" y="156" fill="#000000" font-size="12" font-family="monospace">status</text>
    <text x="195" y="156" fill="#4B5563" font-size="11.5" font-family="monospace">ENUM(Operational...)</text>

    <text x="16" y="178" fill="#000000" font-size="12" font-family="monospace">criticality</text>
    <text x="195" y="178" fill="#4B5563" font-size="11.5" font-family="monospace">ENUM(Low,Med,High,Crit)</text>

    <!-- Row: FK owner_id -->
    <text x="16" y="200" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK owner_id</text>
    <text x="195" y="200" fill="#4B5563" font-size="11.5" font-family="monospace">INT NULL</text>
    <line x1="12" y1="208" x2="328" y2="208" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="228" fill="#000000" font-size="12" font-family="monospace">location</text>
    <text x="195" y="228" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(100)</text>

    <text x="16" y="250" fill="#000000" font-size="12" font-family="monospace">ip_address</text>
    <text x="195" y="250" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(45)</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TABLE 4: SLA_POLICIES (x: 760, y: 150, w: 380, h: 170)                    -->
  <!-- ========================================================================= -->
  <g transform="translate(760, 150)">
    <rect width="380" height="170" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="380" height="38" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="190" y="24" text-anchor="middle" fill="#000000" font-size="14" font-weight="800" letter-spacing="0.5">SLA_POLICIES</text>
    
    <!-- Row 1: PK sla_id -->
    <text x="16" y="60" fill="#000000" font-size="12.5" font-family="monospace" font-weight="800">PK sla_id</text>
    <line x1="16" y1="64" x2="95" y2="64" stroke="#000000" stroke-width="1.8" />
    <text x="215" y="60" fill="#4B5563" font-size="11.5" font-family="monospace">INT AUTO_INC</text>
    <line x1="12" y1="72" x2="368" y2="72" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="92" fill="#000000" font-size="12" font-family="monospace" font-weight="700">priority_level</text>
    <text x="215" y="92" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(20) UK</text>

    <text x="16" y="116" fill="#000000" font-size="12" font-family="monospace">response_time_hrs</text>
    <text x="215" y="116" fill="#4B5563" font-size="11.5" font-family="monospace">DECIMAL(5,2)</text>

    <text x="16" y="140" fill="#000000" font-size="12" font-family="monospace">resolution_time_hrs</text>
    <text x="215" y="140" fill="#4B5563" font-size="11.5" font-family="monospace">DECIMAL(5,2)</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TABLE 5: TICKETS (x: 760, y: 390, w: 380, h: 360) (CENTRAL ENTITY)        -->
  <!-- ========================================================================= -->
  <g transform="translate(760, 390)">
    <rect width="380" height="360" fill="#FFFFFF" stroke="#000000" stroke-width="2.5" />
    <rect width="380" height="42" fill="#F3F4F6" stroke="#000000" stroke-width="1.8" />
    <text x="190" y="27" text-anchor="middle" fill="#000000" font-size="15" font-weight="800" letter-spacing="0.8">TICKETS</text>
    
    <!-- Row 1: PK ticket_id -->
    <text x="16" y="65" fill="#000000" font-size="13" font-family="monospace" font-weight="800">PK ticket_id</text>
    <line x1="16" y1="70" x2="125" y2="70" stroke="#000000" stroke-width="2" />
    <text x="215" y="65" fill="#4B5563" font-size="12" font-family="monospace">INT AUTO_INC</text>
    <line x1="12" y1="78" x2="368" y2="78" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="98" fill="#000000" font-size="12" font-family="monospace">ticket_code</text>
    <text x="215" y="98" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(20) UK</text>

    <text x="16" y="120" fill="#000000" font-size="12" font-family="monospace">title</text>
    <text x="215" y="120" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(200)</text>

    <text x="16" y="142" fill="#000000" font-size="12" font-family="monospace">description</text>
    <text x="215" y="142" fill="#4B5563" font-size="11.5" font-family="monospace">TEXT</text>

    <text x="16" y="164" fill="#000000" font-size="12" font-family="monospace">priority</text>
    <text x="215" y="164" fill="#4B5563" font-size="11.5" font-family="monospace">ENUM(LOW,MED,HIGH,CRIT)</text>

    <text x="16" y="186" fill="#000000" font-size="12" font-family="monospace">status</text>
    <text x="215" y="186" fill="#4B5563" font-size="11.5" font-family="monospace">ENUM(OPEN,IN_PROG...)</text>

    <!-- Row: FK asset_id -->
    <text x="16" y="208" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK asset_id</text>
    <text x="215" y="208" fill="#4B5563" font-size="11.5" font-family="monospace">INT NULL</text>
    <line x1="12" y1="216" x2="368" y2="216" stroke="#E5E7EB" stroke-width="1" />

    <!-- Row: FK created_by -->
    <text x="16" y="234" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK created_by</text>
    <text x="215" y="234" fill="#4B5563" font-size="11.5" font-family="monospace">INT NOT NULL</text>
    <line x1="12" y1="242" x2="368" y2="242" stroke="#E5E7EB" stroke-width="1" />

    <!-- Row: FK assigned_to -->
    <text x="16" y="260" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK assigned_to</text>
    <text x="215" y="260" fill="#4B5563" font-size="11.5" font-family="monospace">INT NULL</text>
    <line x1="12" y1="268" x2="368" y2="268" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="288" fill="#000000" font-size="12" font-family="monospace">due_date</text>
    <text x="215" y="288" fill="#4B5563" font-size="11.5" font-family="monospace">DATETIME</text>

    <text x="16" y="310" fill="#000000" font-size="12" font-family="monospace">sla_breached</text>
    <text x="215" y="310" fill="#4B5563" font-size="11.5" font-family="monospace">BOOLEAN (DERIVED)</text>

    <text x="16" y="332" fill="#4B5563" font-size="11" font-family="monospace">created_at</text>
    <text x="215" y="332" fill="#6B7280" font-size="11" font-family="monospace">TIMESTAMP</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TABLE 6: TICKET_AUDIT_LOG (x: 1480, y: 390, w: 380, h: 260) (WEAK ENTITY) -->
  <!-- ========================================================================= -->
  <g transform="translate(1480, 390)">
    <rect width="380" height="260" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="380" height="38" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="190" y="24" text-anchor="middle" fill="#000000" font-size="14" font-weight="800" letter-spacing="0.5">TICKET_AUDIT_LOG</text>
    
    <!-- Row 1: PK/Partial log_id -->
    <text x="16" y="60" fill="#000000" font-size="12.5" font-family="monospace" font-weight="800">PK log_id</text>
    <line x1="16" y1="64" x2="95" y2="64" stroke="#000000" stroke-width="1.8" />
    <text x="215" y="60" fill="#4B5563" font-size="11.5" font-family="monospace">INT AUTO_INC</text>
    <line x1="12" y1="72" x2="368" y2="72" stroke="#E5E7EB" stroke-width="1" />

    <!-- Row: FK ticket_id -->
    <text x="16" y="90" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK ticket_id</text>
    <text x="215" y="90" fill="#4B5563" font-size="11.5" font-family="monospace">INT NOT NULL</text>
    <line x1="12" y1="98" x2="368" y2="98" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="118" fill="#000000" font-size="12" font-family="monospace">action_type</text>
    <text x="215" y="118" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(50)</text>

    <text x="16" y="140" fill="#000000" font-size="12" font-family="monospace">old_status</text>
    <text x="215" y="140" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(20)</text>

    <text x="16" y="162" fill="#000000" font-size="12" font-family="monospace">new_status</text>
    <text x="215" y="162" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(20)</text>

    <text x="16" y="184" fill="#000000" font-size="12" font-family="monospace">comment</text>
    <text x="215" y="184" fill="#4B5563" font-size="11.5" font-family="monospace">TEXT</text>

    <!-- Row: FK changed_by -->
    <text x="16" y="206" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK changed_by</text>
    <text x="215" y="206" fill="#4B5563" font-size="11.5" font-family="monospace">INT NULL</text>
    <line x1="12" y1="214" x2="368" y2="214" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="234" fill="#4B5563" font-size="11" font-family="monospace">logged_at</text>
    <text x="215" y="234" fill="#6B7280" font-size="11" font-family="monospace">TIMESTAMP</text>
  </g>

  <!-- ========================================================================= -->
  <!-- TABLE 7: KNOWLEDGE_BASE (x: 1480, y: 740, w: 380, h: 250)                 -->
  <!-- ========================================================================= -->
  <g transform="translate(1480, 740)">
    <rect width="380" height="250" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="380" height="38" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="190" y="24" text-anchor="middle" fill="#000000" font-size="14" font-weight="800" letter-spacing="0.5">KNOWLEDGE_BASE</text>
    
    <!-- Row 1: PK kb_id -->
    <text x="16" y="60" fill="#000000" font-size="12.5" font-family="monospace" font-weight="800">PK kb_id</text>
    <line x1="16" y1="64" x2="90" y2="64" stroke="#000000" stroke-width="1.8" />
    <text x="215" y="60" fill="#4B5563" font-size="11.5" font-family="monospace">INT AUTO_INC</text>
    <line x1="12" y1="72" x2="368" y2="72" stroke="#E5E7EB" stroke-width="1" />

    <text x="16" y="90" fill="#000000" font-size="12" font-family="monospace">title</text>
    <text x="215" y="90" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(200)</text>

    <text x="16" y="112" fill="#000000" font-size="12" font-family="monospace">category</text>
    <text x="215" y="112" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(50)</text>

    <text x="16" y="134" fill="#000000" font-size="12" font-family="monospace">keywords</text>
    <text x="215" y="134" fill="#4B5563" font-size="11.5" font-family="monospace">TEXT</text>

    <text x="16" y="156" fill="#000000" font-size="12" font-family="monospace">problem_summary</text>
    <text x="215" y="156" fill="#4B5563" font-size="11.5" font-family="monospace">TEXT</text>

    <text x="16" y="178" fill="#000000" font-size="12" font-family="monospace">resolution_steps</text>
    <text x="215" y="178" fill="#4B5563" font-size="11.5" font-family="monospace">TEXT</text>

    <text x="16" y="200" fill="#000000" font-size="12" font-family="monospace">applicable_asset</text>
    <text x="215" y="200" fill="#4B5563" font-size="11.5" font-family="monospace">VARCHAR(50)</text>

    <text x="16" y="222" fill="#4B5563" font-size="11" font-family="monospace">created_at</text>
    <text x="215" y="222" fill="#6B7280" font-size="11" font-family="monospace">TIMESTAMP</text>
  </g>

  <!-- ========================================================================= -->
  <!-- STANDARDIZED SYMBOL LEGEND TABLE (Bottom-Left)                            -->
  <!-- ========================================================================= -->
  <g transform="translate(60, 1070)">
    <rect width="660" height="250" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="660" height="36" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="330" y="23" text-anchor="middle" fill="#000000" font-size="13" font-weight="800" letter-spacing="0.5">
      RELATIONAL INTEGRITY &amp; REFERENTIAL ACTION LEGEND
    </text>

    <g transform="translate(30, 60)">
      <text x="0" y="14" fill="#000000" font-size="12" font-family="monospace" font-weight="800">PK column_name</text>
      <line x1="0" y1="18" x2="115" y2="18" stroke="#000000" stroke-width="1.8" />
      <text x="140" y="14" fill="#000000" font-size="12">Primary Key (Unique, Not Null entity identifier)</text>
    </g>

    <g transform="translate(30, 95)">
      <text x="0" y="14" fill="#000000" font-size="12" font-family="monospace" font-weight="700">FK column_name</text>
      <text x="140" y="14" fill="#000000" font-size="12">Foreign Key (Referential link to primary parent table)</text>
    </g>

    <g transform="translate(30, 130)">
      <rect x="0" y="0" width="120" height="20" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
      <text x="60" y="14" text-anchor="middle" fill="#000000" font-size="9" font-weight="700">ON DELETE CASCADE</text>
      <text x="140" y="14" fill="#000000" font-size="12">Deletes child audit records automatically when parent ticket is purged</text>
    </g>

    <g transform="translate(30, 165)">
      <rect x="0" y="0" width="120" height="20" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
      <text x="60" y="14" text-anchor="middle" fill="#000000" font-size="9" font-weight="700">ON DELETE RESTRICT</text>
      <text x="140" y="14" fill="#000000" font-size="12">Prevents deletion of departments or users while active tickets exist</text>
    </g>

    <g transform="translate(30, 200)">
      <rect x="0" y="0" width="120" height="20" rx="3" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
      <text x="60" y="14" text-anchor="middle" fill="#000000" font-size="9" font-weight="700">ON DELETE SET NULL</text>
      <text x="140" y="14" fill="#000000" font-size="12">Preserves ticket history by disassociating unassigned assets or agents</text>
    </g>
  </g>

</svg>'''
    return svg

def generate_system_architecture():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1700 1120" width="100%" height="100%" style="background-color: #FFFFFF; font-family: 'Segoe UI', Arial, sans-serif;">
  <defs>
    <marker id="archArrow" markerWidth="9" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 9 3, 0 6" fill="#000000" />
    </marker>
  </defs>

  <!-- ========================================================================= -->
  <!-- TOP BANNER (White Box with Black Border)                                  -->
  <!-- ========================================================================= -->
  <g transform="translate(850, 57)">
    <rect x="-580" y="-35" width="1160" height="72" rx="4" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-8" text-anchor="middle" fill="#000000" font-size="22" font-weight="800" letter-spacing="0.5">
      3-TIER ENTERPRISE SYSTEM ARCHITECTURE
    </text>
    <text y="20" text-anchor="middle" fill="#333333" font-size="13" font-weight="600" letter-spacing="0.3">
      Client Presentation (Next.js 14) • Middleware (API Routes &amp; RBAC) • Multi-Paradigm Data Tier (SQL, Graph, Vector)
    </text>
  </g>

  <!-- ========================================================================= -->
  <!-- TIER 1: CLIENT PRESENTATION TIER (y: 135 to 345, h: 210)                  -->
  <!-- ========================================================================= -->
  <rect x="50" y="135" width="1600" height="210" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
  
  <rect x="70" y="150" width="340" height="30" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="80" y="170" fill="#000000" font-size="13" font-weight="800">TIER 1: PRESENTATION LAYER (CLIENT)</text>

  <!-- Presentation Components (4 Sub-Cards) -->
  <g transform="translate(80, 195)">
    <rect width="340" height="125" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">Dashboard &amp; Telemetry</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• Real-time SLA compliance tracking</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• Live technician workload analytics</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• Critical infrastructure outage alert</text>
    <text x="15" y="112" fill="#666666" font-size="10.5">Next.js 14 App Router (React Server/Client)</text>
  </g>

  <g transform="translate(460, 195)">
    <rect width="340" height="125" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">Ticket Command Center</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• Modal creation with asset linking</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• Priority &amp; SLA deadline indicator</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• Quick status update &amp; resolve workflow</text>
    <text x="15" y="112" fill="#666666" font-size="10.5">RBAC enforced ticket manipulation UI</text>
  </g>

  <g transform="translate(840, 195)">
    <rect width="340" height="125" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">CMDB Graph Topology</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• Interactive SVG dependency graph</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• Outage blast-radius simulation</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• Recursive failure cascade paths</text>
    <text x="15" y="112" fill="#666666" font-size="10.5">Neo4j Property Graph Visualization</text>
  </g>

  <g transform="translate(1220, 195)">
    <rect width="400" height="125" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">AI Knowledge &amp; Lab Runner</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• Cosine similarity diagnostic search</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• Interactive SQL &amp; Cypher query runner</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• Live benchmark execution timers</text>
    <text x="15" y="112" fill="#666666" font-size="10.5">Vector embeddings &amp; 50/50 rubric harness</text>
  </g>

  <!-- ========================================================================= -->
  <!-- DOWNWARD ARROWS (Client to Middleware)                                    -->
  <!-- ========================================================================= -->
  <line x1="250" y1="345" x2="250" y2="445" stroke="#000000" stroke-width="1.8" marker-end="url(#archArrow)" />
  <line x1="630" y1="345" x2="630" y2="445" stroke="#000000" stroke-width="1.8" marker-end="url(#archArrow)" />
  <line x1="1010" y1="345" x2="1010" y2="445" stroke="#000000" stroke-width="1.8" marker-end="url(#archArrow)" />
  <line x1="1420" y1="345" x2="1420" y2="445" stroke="#000000" stroke-width="1.8" marker-end="url(#archArrow)" />

  <text x="850" y="398" text-anchor="middle" fill="#000000" font-size="11" font-weight="700" letter-spacing="0.4">
    HTTP JSON API REQUESTS (GET / POST / PUT) WITH ACTIVE ROLE CONTEXT
  </text>

  <!-- ========================================================================= -->
  <!-- TIER 2: APPLICATION MIDDLEWARE &amp; LOGIC TIER (y: 450 to 680, h: 230)       -->
  <!-- ========================================================================= -->
  <rect x="50" y="450" width="1600" height="230" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
  
  <rect x="70" y="465" width="400" height="30" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="80" y="485" fill="#000000" font-size="13" font-weight="800">TIER 2: APPLICATION &amp; MIDDLEWARE LOGIC</text>

  <!-- Logic Components (4 Sub-Cards) -->
  <g transform="translate(80, 510)">
    <rect width="340" height="145" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">API Route Controllers</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• /api/tickets (CRUD &amp; Validation)</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• /api/assets (Inventory &amp; Topology)</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• /api/views (Aggregated Metrics)</text>
    <text x="15" y="112" fill="#333333" font-size="11.5">• /api/db-query (Lab Evaluation Engine)</text>
    <text x="15" y="132" fill="#666666" font-size="10.5">Stateless RESTful handlers</text>
  </g>

  <g transform="translate(460, 510)">
    <rect width="340" height="145" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">RBAC Security Guard</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• Session role validation header</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• Admin: Full DB write &amp; schema rights</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• Agent: Read/write tickets &amp; assets</text>
    <text x="15" y="112" fill="#333333" font-size="11.5">• Employee: Read-only &amp; self-tickets</text>
    <text x="15" y="132" fill="#666666" font-size="10.5">Least-privilege authorization</text>
  </g>

  <g transform="translate(840, 510)">
    <rect width="340" height="145" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">Graph Traversal Engine</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• Cypher variable-depth pathing</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• In-memory BFS/DFS fallback</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• Upstream blast radius discovery</text>
    <text x="15" y="112" fill="#333333" font-size="11.5">• Recursive dependency resolution</text>
    <text x="15" y="132" fill="#666666" font-size="10.5">Index-free adjacency mapping</text>
  </g>

  <g transform="translate(1220, 510)">
    <rect width="400" height="145" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" />
    <text x="15" y="28" fill="#000000" font-size="14" font-weight="700">AI Vector Embedding Matcher</text>
    <text x="15" y="52" fill="#333333" font-size="11.5">• Dense 8-dimensional semantic vectors</text>
    <text x="15" y="72" fill="#333333" font-size="11.5">• Cosine similarity scoring formula</text>
    <text x="15" y="92" fill="#333333" font-size="11.5">• Unstructured query tokenization</text>
    <text x="15" y="112" fill="#333333" font-size="11.5">• Candidate runbook ranking</text>
    <text x="15" y="132" fill="#666666" font-size="10.5">Sub-5ms on-device semantic retrieval</text>
  </g>

  <!-- ========================================================================= -->
  <!-- DOWNWARD ARROWS (Middleware to Data Tier)                                 -->
  <!-- ========================================================================= -->
  <line x1="380" y1="680" x2="380" y2="780" stroke="#000000" stroke-width="1.8" marker-end="url(#archArrow)" />
  <line x1="880" y1="680" x2="880" y2="780" stroke="#000000" stroke-width="1.8" marker-end="url(#archArrow)" />
  <line x1="1380" y1="680" x2="1380" y2="780" stroke="#000000" stroke-width="1.8" marker-end="url(#archArrow)" />

  <text x="850" y="733" text-anchor="middle" fill="#000000" font-size="11" font-weight="700" letter-spacing="0.4">
    MULTI-PARADIGM QUERIES: SQL (TCP/3306) • BOLT CYPHER (TCP/7687) • VECTOR ARRAYS
  </text>

  <!-- ========================================================================= -->
  <!-- TIER 3: MULTI-PARADIGM DATA TIER (y: 785 to 1080, h: 295)                 -->
  <!-- ========================================================================= -->
  <rect x="50" y="785" width="1600" height="295" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
  
  <rect x="70" y="800" width="450" height="30" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="80" y="820" fill="#000000" font-size="13" font-weight="800">TIER 3: MULTI-PARADIGM PERSISTENCE TIER</text>

  <!-- 3 Data Stores -->
  <g transform="translate(80, 845)">
    <rect width="460" height="215" fill="#FFFFFF" stroke="#000000" stroke-width="1.4" />
    <text x="20" y="32" fill="#000000" font-size="16" font-weight="800">MySQL 8.0 Enterprise RDBMS</text>
    <text x="20" y="60" fill="#333333" font-size="12">• 7 Relational Tables normalized in 3NF</text>
    <text x="20" y="82" fill="#333333" font-size="12">• ACID Transactions with ROLLBACK exception handlers</text>
    <text x="20" y="104" fill="#333333" font-size="12">• 3 Database Views (SLA tracking, Workloads, Hotspots)</text>
    <text x="20" y="126" fill="#333333" font-size="12">• 3 Automated Triggers (Insert SLA, Audit Log, Guards)</text>
    <text x="20" y="148" fill="#333333" font-size="12">• Stored Procedures (sp_auto_assign, sp_resolve)</text>
    <text x="20" y="170" fill="#333333" font-size="12">• WITH RECURSIVE hierarchical CTE escalation chains</text>
    <text x="20" y="196" fill="#666666" font-size="11">Relational integrity &amp; audit history engine</text>
  </g>

  <g transform="translate(580, 845)">
    <rect width="480" height="215" fill="#FFFFFF" stroke="#000000" stroke-width="1.4" />
    <text x="20" y="32" fill="#000000" font-size="16" font-weight="800">Neo4j Graph Database (CMDB)</text>
    <text x="20" y="60" fill="#333333" font-size="12">• Labeled property graph nodes (:ConfigurationItem)</text>
    <text x="20" y="82" fill="#333333" font-size="12">• Directed dependency relationships: [:DEPENDS_ON]</text>
    <text x="20" y="104" fill="#333333" font-size="12">• Variable-depth Cypher query: -[*1..4]-&gt;</text>
    <text x="20" y="126" fill="#333333" font-size="12">• Complete RUD operations (Read, SET update, DETACH DELETE)</text>
    <text x="20" y="148" fill="#333333" font-size="12">• Single-query blast radius traversal across 5 CI tiers</text>
    <text x="20" y="170" fill="#333333" font-size="12">• Microsecond index-free adjacency graph navigation</text>
    <text x="20" y="196" fill="#666666" font-size="11">NoSQL property graph infrastructure model</text>
  </g>

  <g transform="translate(1100, 845)">
    <rect width="520" height="215" fill="#FFFFFF" stroke="#000000" stroke-width="1.4" />
    <text x="20" y="32" fill="#000000" font-size="16" font-weight="800">Vector Embeddings &amp; Zero-Config Fallback</text>
    <text x="20" y="60" fill="#333333" font-size="12">• Dense vector embedding store for IT runbooks</text>
    <text x="20" y="82" fill="#333333" font-size="12">• Cosine distance scoring engine for unstructured text</text>
    <text x="20" y="104" fill="#333333" font-size="12">• High-performance in-memory relational simulation engine</text>
    <text x="20" y="126" fill="#333333" font-size="12">• Embedded graph adjacency engine (Runs without local DB services)</text>
    <text x="20" y="148" fill="#333333" font-size="12">• 100% portable for grading and offline lab evaluation</text>
    <text x="20" y="170" fill="#333333" font-size="12">• Zero external daemon installation requirement</text>
    <text x="20" y="196" fill="#666666" font-size="11">Embedded multi-model engine &amp; fallback harness</text>
  </g>

</svg>'''
    return svg

def generate_cmdb_topology():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 1140" width="100%" height="100%" style="background-color: #FFFFFF; font-family: 'Segoe UI', Arial, sans-serif;">
  <defs>
    <marker id="edgeArrowBw" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="#000000" />
    </marker>
    <marker id="edgeArrowImpactBw" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
    </marker>
  </defs>

  <!-- ========================================================================= -->
  <!-- TOP BANNER (White Box with Black Border)                                  -->
  <!-- ========================================================================= -->
  <g transform="translate(880, 57)">
    <rect x="-560" y="-35" width="1120" height="72" rx="4" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-8" text-anchor="middle" fill="#000000" font-size="22" font-weight="800" letter-spacing="0.5">
      NEO4J CMDB TOPOLOGY &amp; BLAST RADIUS GRAPH MODEL
    </text>
    <text y="20" text-anchor="middle" fill="#333333" font-size="13" font-weight="600" letter-spacing="0.3">
      Configuration Item (CI) Nodes • Directed Dependencies • Recursive Cypher Outage Traversal
    </text>
  </g>

  <!-- ========================================================================= -->
  <!-- 5 ARCHITECTURAL TIER HEADERS                                              -->
  <!-- ========================================================================= -->
  <rect x="50" y="125" width="260" height="32" rx="2" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="180" y="146" text-anchor="middle" fill="#000000" font-size="12" font-weight="800">TIER 1: APPLICATIONS</text>

  <rect x="370" y="125" width="260" height="32" rx="2" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="500" y="146" text-anchor="middle" fill="#000000" font-size="12" font-weight="800">TIER 2: MICROSERVICES</text>

  <rect x="690" y="125" width="260" height="32" rx="2" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="820" y="146" text-anchor="middle" fill="#000000" font-size="12" font-weight="800">TIER 3: DATABASES</text>

  <rect x="1010" y="125" width="260" height="32" rx="2" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="1140" y="146" text-anchor="middle" fill="#000000" font-size="12" font-weight="800">TIER 4: SERVERS</text>

  <rect x="1330" y="125" width="380" height="32" rx="2" fill="#F3F4F6" stroke="#000000" stroke-width="1.2" />
  <text x="1520" y="146" text-anchor="middle" fill="#000000" font-size="12" font-weight="800">TIER 5: SWITCHES &amp; STORAGE</text>

  <!-- ========================================================================= -->
  <!-- GRAPH EDGES (Normal: Solid 1.5px Black, Impacted: Bold Dashed 2.5px Black) -->
  <!-- ========================================================================= -->

  <!-- Edges: Tier 1 to Tier 2 (DEPENDS_ON) -->
  <line x1="180" y1="240" x2="500" y2="240" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#edgeArrowImpactBw)" />
  <text x="340" y="232" fill="#000000" font-size="10" font-weight="700" text-anchor="middle">[:DEPENDS_ON]</text>

  <line x1="180" y1="380" x2="500" y2="380" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#edgeArrowImpactBw)" />
  <text x="340" y="372" fill="#000000" font-size="10" font-weight="700" text-anchor="middle">[:DEPENDS_ON]</text>

  <line x1="180" y1="520" x2="500" y2="520" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
  <text x="340" y="512" fill="#000000" font-size="10" text-anchor="middle">[:DEPENDS_ON]</text>

  <line x1="180" y1="660" x2="500" y2="660" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
  <text x="340" y="652" fill="#000000" font-size="10" text-anchor="middle">[:DEPENDS_ON]</text>

  <!-- Edges: Tier 2 to Tier 3 (DEPENDS_ON) -->
  <line x1="500" y1="240" x2="820" y2="310" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#edgeArrowImpactBw)" />
  <text x="660" y="265" fill="#000000" font-size="10" font-weight="700" text-anchor="middle">[:DEPENDS_ON]</text>

  <line x1="500" y1="380" x2="820" y2="310" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#edgeArrowImpactBw)" />
  <text x="660" y="355" fill="#000000" font-size="10" font-weight="700" text-anchor="middle">[:DEPENDS_ON]</text>

  <line x1="500" y1="520" x2="820" y2="520" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
  <text x="660" y="512" fill="#000000" font-size="10" text-anchor="middle">[:DEPENDS_ON]</text>

  <!-- Edges: Tier 3 to Tier 4 (HOSTED_ON) -->
  <line x1="820" y1="310" x2="1140" y2="310" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#edgeArrowImpactBw)" />
  <text x="980" y="302" fill="#000000" font-size="10" font-weight="700" text-anchor="middle">[:HOSTED_ON]</text>

  <line x1="820" y1="520" x2="1140" y2="520" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
  <text x="980" y="512" fill="#000000" font-size="10" text-anchor="middle">[:HOSTED_ON]</text>

  <line x1="820" y1="730" x2="1140" y2="730" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
  <text x="980" y="722" fill="#000000" font-size="10" text-anchor="middle">[:HOSTED_ON]</text>

  <!-- Edges: Tier 4 to Tier 5 (CONNECTED_TO &amp; STORES_ON) -->
  <line x1="1140" y1="310" x2="1520" y2="310" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#edgeArrowImpactBw)" />
  <text x="1330" y="302" fill="#000000" font-size="10" font-weight="700" text-anchor="middle">[:CONNECTED_TO]</text>

  <line x1="1140" y1="520" x2="1520" y2="520" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
  <text x="1330" y="512" fill="#000000" font-size="10" text-anchor="middle">[:CONNECTED_TO]</text>

  <line x1="1140" y1="730" x2="1520" y2="730" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
  <text x="1330" y="722" fill="#000000" font-size="10" text-anchor="middle">[:STORES_ON]</text>

  <!-- ========================================================================= -->
  <!-- GRAPH NODES (Clean White Fill, Solid Black Stroke, Bold Markings)          -->
  <!-- ========================================================================= -->

  <!-- Tier 1: Applications -->
  <!-- APP-01 (Student ERP) - IMPACTED -->
  <g transform="translate(180, 240)">
    <circle r="32" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <circle r="26" fill="none" stroke="#000000" stroke-width="1.4" stroke-dasharray="4,3" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">APP-01</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">ERP Portal</text>
    <text y="48" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">[IMPACTED - HOP 4]</text>
  </g>

  <!-- APP-02 (Campus LMS) - IMPACTED -->
  <g transform="translate(180, 380)">
    <circle r="32" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <circle r="26" fill="none" stroke="#000000" stroke-width="1.4" stroke-dasharray="4,3" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">APP-02</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Campus LMS</text>
    <text y="48" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">[IMPACTED - HOP 4]</text>
  </g>

  <!-- APP-03 (Service Desk Web) - HEALTHY -->
  <g transform="translate(180, 520)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">APP-03</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Service Desk</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- APP-04 (Library Portal) - HEALTHY -->
  <g transform="translate(180, 660)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">APP-04</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Library System</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- Tier 2: Microservices -->
  <!-- MS-AUTH (Auth Gateway) - IMPACTED -->
  <g transform="translate(500, 240)">
    <circle r="32" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <circle r="26" fill="none" stroke="#000000" stroke-width="1.4" stroke-dasharray="4,3" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">MS-AUTH</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">SSO Gateway</text>
    <text y="48" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">[IMPACTED - HOP 3]</text>
  </g>

  <!-- MS-PAY (Payment Service) - IMPACTED -->
  <g transform="translate(500, 380)">
    <circle r="32" fill="#FFFFFF" stroke="#000000" stroke-width="2.2" />
    <circle r="26" fill="none" stroke="#000000" stroke-width="1.4" stroke-dasharray="4,3" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">MS-PAY</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Fee Engine</text>
    <text y="48" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">[IMPACTED - HOP 3]</text>
  </g>

  <!-- MS-NOTIF (Notification Svc) - HEALTHY -->
  <g transform="translate(500, 520)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">MS-NOTIF</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Email &amp; SMS</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- MS-REPORT (Analytics) - HEALTHY -->
  <g transform="translate(500, 660)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">MS-REPORT</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">BI Analytics</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- Tier 3: Databases -->
  <!-- DB-MYSQL (MySQL Database Node 1) - IMPACTED -->
  <g transform="translate(820, 310)">
    <circle r="34" fill="#FFFFFF" stroke="#000000" stroke-width="2.4" />
    <circle r="28" fill="none" stroke="#000000" stroke-width="1.5" stroke-dasharray="4,3" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">DB-MYSQL</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">MySQL Cluster</text>
    <text y="50" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">[IMPACTED - HOP 2]</text>
  </g>

  <!-- DB-NEO4J (Neo4j Graph Database) - HEALTHY -->
  <g transform="translate(820, 520)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">DB-NEO4J</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">CMDB Graph</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- DB-REDIS (Redis Cache) - HEALTHY -->
  <g transform="translate(820, 730)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">DB-REDIS</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Session Cache</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- Tier 4: Servers -->
  <!-- SRV-ALPHA (App Host Node Alpha) - IMPACTED -->
  <g transform="translate(1140, 310)">
    <circle r="34" fill="#FFFFFF" stroke="#000000" stroke-width="2.4" />
    <circle r="28" fill="none" stroke="#000000" stroke-width="1.5" stroke-dasharray="4,3" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">SRV-ALPHA</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Host Node 01</text>
    <text y="50" text-anchor="middle" fill="#000000" font-size="10" font-weight="700">[IMPACTED - HOP 1]</text>
  </g>

  <!-- SRV-BETA (App Host Node Beta) - HEALTHY -->
  <g transform="translate(1140, 520)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">SRV-BETA</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Host Node 02</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- SRV-GAMMA (DB Host Server) - HEALTHY -->
  <g transform="translate(1140, 730)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">SRV-GAMMA</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Backup Host</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- Tier 5: Switches & Storage -->
  <!-- SW-EDGE-02 (SIMULATED OUTAGE COMPONENT - Solid Black Fill with Inverted White Text for Instant Printout Identification) -->
  <g transform="translate(1520, 310)">
    <circle r="38" fill="#000000" stroke="#000000" stroke-width="3" />
    <circle r="44" fill="none" stroke="#000000" stroke-width="2" stroke-dasharray="4,3" />
    <text y="-6" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="800">SW-EDGE-02</text>
    <text y="10" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="700">CS Edge Switch</text>
    <text y="58" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">*** FAILURE ORIGIN ***</text>
  </g>

  <!-- SW-CORE-01 (Core Backbone Switch) - HEALTHY -->
  <g transform="translate(1520, 520)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">SW-CORE-01</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">Backbone SW</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- SAN-ARRAY-01 (NetApp SAN Storage) - HEALTHY -->
  <g transform="translate(1520, 730)">
    <circle r="30" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <text y="-5" text-anchor="middle" fill="#000000" font-size="11" font-weight="800">SAN-ARRAY</text>
    <text y="10" text-anchor="middle" fill="#000000" font-size="9">NetApp Storage</text>
    <text y="46" text-anchor="middle" fill="#555555" font-size="9.5">OPERATIONAL</text>
  </g>

  <!-- ========================================================================= -->
  <!-- STANDARDIZED SYMBOL LEGEND TABLE (Bottom)                                 -->
  <!-- ========================================================================= -->
  <g transform="translate(50, 830)">
    <rect width="1660" height="260" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
    <rect width="1660" height="36" fill="#F3F4F6" stroke="#000000" stroke-width="1.5" />
    <text x="830" y="23" text-anchor="middle" fill="#000000" font-size="13" font-weight="800" letter-spacing="0.5">
      NEO4J GRAPH MODEL &amp; OUTAGE BLAST RADIUS TRAVERSAL SPECIFICATION
    </text>

    <!-- Legend Columns -->
    <g transform="translate(50, 60)">
      <!-- Item 1: Normal Node -->
      <circle cx="20" cy="15" r="16" fill="#FFFFFF" stroke="#000000" stroke-width="1.8" />
      <text x="50" y="20" fill="#000000" font-size="12"><tspan font-weight="700">Operational Node:</tspan> CI functioning nominally</text>

      <!-- Item 2: Outage Origin Node -->
      <g transform="translate(0, 45)">
        <circle cx="20" cy="15" r="16" fill="#000000" stroke="#000000" stroke-width="2" />
        <text x="50" y="20" fill="#000000" font-size="12"><tspan font-weight="700">Solid Black Node:</tspan> Simulated Outage Origin (SW-EDGE-02)</text>
      </g>

      <!-- Item 3: Impacted Node -->
      <g transform="translate(0, 90)">
        <circle cx="20" cy="15" r="16" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
        <circle cx="20" cy="15" r="12" fill="none" stroke="#000000" stroke-width="1.2" stroke-dasharray="3,2" />
        <text x="50" y="20" fill="#000000" font-size="12"><tspan font-weight="700">Double Ring Node:</tspan> Cascading Outage Dependency (Hops 1 to 4)</text>
      </g>
    </g>

    <g transform="translate(620, 60)">
      <!-- Item 4: Edge Types -->
      <line x1="0" y1="15" x2="60" y2="15" stroke="#000000" stroke-width="1.5" marker-end="url(#edgeArrowBw)" />
      <text x="75" y="20" fill="#000000" font-size="12"><tspan font-weight="700">Solid Directed Line:</tspan> Standard Graph Dependency</text>

      <g transform="translate(0, 45)">
        <line x1="0" y1="15" x2="60" y2="15" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#edgeArrowImpactBw)" />
        <text x="75" y="20" fill="#000000" font-size="12"><tspan font-weight="700">Bold Dashed Line:</tspan> Active Blast Radius Failure Propagation Path</text>
      </g>

      <g transform="translate(0, 90)">
        <text x="0" y="20" fill="#000000" font-size="12" font-family="monospace">MATCH p=(impacted)-[*1..4]->(failed {id:'SW-EDGE-02'})</text>
      </g>
    </g>

    <g transform="translate(1220, 60)">
      <text x="0" y="16" fill="#000000" font-size="12" font-weight="700">Academic Traversal Mapping:</text>
      <text x="0" y="38" fill="#333333" font-size="11.5">• Tier 5 Switch Outage (SW-EDGE-02)</text>
      <text x="0" y="58" fill="#333333" font-size="11.5">• Propagates to Tier 4 Server (SRV-ALPHA - 1 Hop)</text>
      <text x="0" y="78" fill="#333333" font-size="11.5">• Disables Tier 3 Database (DB-MYSQL - 2 Hops)</text>
      <text x="0" y="98" fill="#333333" font-size="11.5">• Halts Tier 2 Microservices (MS-AUTH, MS-PAY - 3 Hops)</text>
      <text x="0" y="118" fill="#333333" font-size="11.5">• Breaches Tier 1 Mission-Critical SLAs (APP-01, APP-02 - 4 Hops)</text>
    </g>
  </g>

</svg>'''
    return svg

def main():
    generators = {
        'er_diagram.svg': generate_er_diagram,
        'relational_schema.svg': generate_relational_schema,
        'system_architecture.svg': generate_system_architecture,
        'cmdb_topology.svg': generate_cmdb_topology
    }

    targets = ['public/diagrams', 'docs/diagrams']

    for folder in targets:
        os.makedirs(folder, exist_ok=True)
        for filename, gen_func in generators.items():
            filepath = os.path.join(folder, filename)
            content = gen_func()
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Generated {filepath} ({len(content)} bytes)")

if __name__ == '__main__':
    main()

