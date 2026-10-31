import asyncio
import os
from playwright.async_api import async_playwright

routes = [
    ("01_dashboard.png", "http://localhost:3000", None),
    ("02_tickets_management.png", "http://localhost:3000/tickets", None),
    ("03_create_ticket_modal.png", "http://localhost:3000/tickets", "button:has-text('New Incident Ticket')"),
    ("04_cmdb_asset_topology.png", "http://localhost:3000/assets", None),
    ("05_ai_knowledge_search.png", "http://localhost:3000/knowledge", None),
    ("06_database_feature_runner.png", "http://localhost:3000/db-demo", None),
    ("07_diagrams_viewer.png", "http://localhost:3000/diagrams", None),
]

async def capture_all():
    os.makedirs("docs/screenshots", exist_ok=True)
    os.makedirs("public/screenshots", exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            headless=True
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 920})
        
        for filename, url, action in routes:
            print(f"Navigating to {url}...")
            await page.goto(url, wait_until="networkidle")
            await asyncio.sleep(1.5)
            
            if action:
                try:
                    btn = page.locator(action)
                    if await btn.count() > 0:
                        await btn.first.click()
                        await asyncio.sleep(0.8)
                except Exception as e:
                    print(f"Action error on {filename}: {e}")
            
            doc_path = os.path.join("docs", "screenshots", filename)
            pub_path = os.path.join("public", "screenshots", filename)
            await page.screenshot(path=doc_path)
            await page.screenshot(path=pub_path)
            print(f"Saved {filename} -> {doc_path} and {pub_path}")
            
        await browser.close()
        print("All screenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(capture_all())

