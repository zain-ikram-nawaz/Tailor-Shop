import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getLeads, updateLeadStatus } from "@/db/db";

function isAdmin(session) {
  return !!(session?.user?.role === "admin");
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const status = searchParams.get("status") || undefined;

    let fileLeads = await getLeads();
    if (status) fileLeads = fileLeads.filter((l) => l.status === status);

    const total = fileLeads.length;
    const pages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedLeads = fileLeads.slice(startIndex, startIndex + limit);

    return NextResponse.json({ leads: paginatedLeads, total, pages });
  } catch (err) {
    console.error("Error fetching admin leads:", err);
    return NextResponse.json({ error: "Failed to retrieve lead dashboard database" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await auth();
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields: 'id' and 'status'." }, { status: 400 });
    }

    const updatedLead = await updateLeadStatus(id, status);
    if (!updatedLead) {
      return NextResponse.json({ error: "Lead profile not found in database." }, { status: 404 });
    }

    return NextResponse.json({ lead: updatedLead });
  } catch (err) {
    console.error("Error updating lead status:", err);
    return NextResponse.json({ error: "Failed to update lead status." }, { status: 500 });
  }
}
