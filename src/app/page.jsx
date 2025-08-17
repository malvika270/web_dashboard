"use client";
import {useState,useEffect, use} from 'react';
import {ref,get} from 'firebase/database';
import {database} from '../firebase/firebaseConfig';
//import { clerkClient } from "@clerk/nextjs/dist/types/server";
// import { useUser } from '@clerk/nextjs';
// import Link from 'next/link';
// // import {checkRole} from '../../utils/roles/roles';
// import Sidebar from '../components/sidebar.js';




function page() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort,setSort]=useState("ascending");
  const [selectedDate, setSelectedDate] = useState("");
  // const {user,isLoaded} = useUser();
  
  // const role = user?.publicMetadata?.role;
 const get_logs = async () => {
    setSearchTerm("");
    try {
      const data_reference = ref(database, "logs");
      const snapshot = await get(data_reference);
      const data = snapshot.val();

      let entries = [];
      if (data) {
        Object.values(data).forEach((log) => {
          entries.push({
            uid: log.uid || "",
            name: log.name || "",
            time: log.time || "",
          });
        });
      }

      setData(entries);
      setSort(entries);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };
  const search_logs = async (searchTerm) => {
    if (!data) return;
    const filtered = data.filter(entry => 
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.uid.toLowerCase().includes(searchTerm.toLowerCase()) );
    setFilteredData(filtered);
    sortData(filtered,sort);
  }
 const sortData = (data) => {
    const sorted = [...data].sort((a, b) => {
      if (sort === "ascending") {
        return a.time.localeCompare(b.time);
      } else {
        return b.time.localeCompare(a.time);
      }
    });
    setFilteredData(sorted);
  };
   
  const change_date_format = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  const filterByDate = (date) => {
    if (!date) {
      sortData(data);
      return;
    }
    const formattedDate = change_date_format(date);
    const matchingData = data.filter((entry) =>
      entry.time.startsWith(formattedDate)
    );
    sortData(matchingData);
  };
  // useEffect(() => {
  //   get_logs();
  // });
  useEffect(() => {
    sortData(data);}, [sort,setSort]);
  useEffect(() => {
    search_logs(searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    filterByDate(selectedDate);
  }, [selectedDate]);
  // if (!isLoaded) return;
  // console.log("User role:", checkRole(role));
  
  return (
      <div>
      {/* <Sidebar /> */}
  
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "30px", textAlign: "center" }}>Log Viewer</h1>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button
          onClick={get_logs}
          style={{
            padding: "8px 16px",
            marginRight: "20px",
            cursor: "pointer",
            backgroundColor: "#456882",
            borderRadius: "6px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Read Logs
        </button>

        <input
          type="text"
          placeholder="Search UID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            padding: "8px",
            backgroundColor: "#456882",
            borderRadius: "6px",
            border: "1px solid black",
            color: "white",
            flexGrow: 1,
            minWidth: "200px",
          }}
        />

        <label htmlFor="filters" style={{ marginLeft: "20px", color: "black" }}>
          Sort by:{" "}
        </label>
        <select
          id="filters"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            color: "white",
            marginLeft: "10px",
            backgroundColor: "#456882",
          }}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>

        <label htmlFor="date" style={{ marginLeft: "20px", color: "white" }}>
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)
          }
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "4px",
            
            color: "white",
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        {filteredData.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#1B3C53",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#456882" }}>
                <th style={{ border: "1px solid #999", padding: "10px" }}>
                  S.No
                </th>
                <th style={{ border: "1px solid #999", padding: "10px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid #999", padding: "10px" }}>
                  UID
                </th>
                <th style={{ border: "1px solid #999", padding: "10px" }}>
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={{ border: "1px solid #999", padding: "10px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #999", padding: "10px" }}>
                    {entry.name}
                  </td>
                  <td style={{ border: "1px solid #999", padding: "10px" }}>
                    {entry.uid}
                  </td>
                  <td style={{ border: "1px solid #999", padding: "10px" }}>
                    {entry.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>Search for logs</p>
        )}
      </div>
    </div>
    
    {/* <div style={{ textAlign: "center", marginTop: "20px" ,color: "white"}}>
        {role === "admin" &&
        <Link href="/admin"> admin dashboard</Link>
}
    </div> */}
      </div>
  )}


export default page 

