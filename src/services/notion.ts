// Minimal Notion Integration for FlowCloser
// Uses fetch to avoid adding new dependencies immediately

const NOTION_KEY = process.env.NOTION_API_KEY;
const CRM_DB_ID = "2fb8c6e8-3be0-81ff-ac81-c853ae0cefc7";
const NOTION_VERSION = "2022-06-28";

export async function syncLeadToNotion(lead: any) {
    if (!NOTION_KEY) {
        console.warn("⚠️ NOTION_API_KEY not set. Skipping sync.");
        return;
    }

    try {
        console.log(`✨ Syncing Lead to Notion: ${lead.name}...`);

        // Map Status
        let status = "New";
        if (lead.qualified) status = "Qualified";
        if (lead.status === "closed") status = "Closed";

        const res = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NOTION_KEY}`,
                "Notion-Version": NOTION_VERSION,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                parent: { database_id: CRM_DB_ID },
                properties: {
                    "Name": { "title": [{ "text": { "content": lead.name || "Unknown Lead" } }] },
                    "Status": { "select": { "name": status } },
                    "Score": { "number": lead.score || 0 },
                    "Platform": { "select": { "name": lead.platform === "whatsapp" ? "WhatsApp" : "Instagram" } },
                    "Company": { "rich_text": [{ "text": { "content": lead.company || "N/A" } }] },
                    "Phone/ID": { "rich_text": [{ "text": { "content": lead.user_platform_id } }] },
                    "Last Interaction": { "date": { "start": new Date().toISOString() } }
                }
            })
        });

        if (!res.ok) {
            const err = await res.json() as any;
            console.error("❌ Failed to sync to Notion:", JSON.stringify(err));
        } else {
            const data = await res.json() as any;
            console.log(`✅ Lead Synced! Notion ID: ${data.id}`);
        }
    } catch (e) {
        console.error("❌ Notion Sync Error:", e);
    }
}
