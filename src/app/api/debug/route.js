import { currentUser } from "@clerk/nextjs/server"

export async function GET() {
  try {
    const user = await currentUser()
    return Response.json({ user })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
