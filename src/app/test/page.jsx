"use client"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/debug")

        console.log("Response object:", res)  // 👀 check if this is a real Response

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }

        const data = await res.json()
        console.log("Data:", data?.user?.publicMetadata?.role || "No role found")  // 👀 check if data is structured as expected
      } catch (err) {
        console.error("Fetch error:", err)
      }
    }

    getData()
  }, [])

  return (
    <div>
      <h1>Debug Page</h1>
      <p>Check the console for logs.</p>
    </div>
  )
}
