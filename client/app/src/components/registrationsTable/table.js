import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import $ from "jquery"
import DataTables from "datatables.net"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "../../App.css"
const DataTable = DataTables(Window, $)
function Table(){
    const tableRef = useRef()
    let resData
    let structuredData =[]
    useEffect(()=>{
        axios.get("http://localhost:3000/user/registers").then((res)=>{
            resData = res.data
            resData.data.map((val,ind)=>structuredData[ind]=Object.values(val))
            console.log(structuredData)
            new DataTable(tableRef.current, {
                dom: 'lBfrtip',
                buttons: [
                    'copy', 'csv', 'print'
                ],
                data: structuredData,
                columns:[
                {"title":"_id",visible:false},
                {"title": "name"},
                { "title": "DOB" },
                { "title": "gender" },
                { "title": "mobile" },
                { "title": "govtIDType" },
                { "title": "govtId" },
                { "title": "guardianType" },
                { "title": "guardianName" },
                { "title": "email",visible:false },
                { "title": "emergencyContact" ,visible:false},
                { "title": "address",visible:false },
                { "title": "state",visible:false },
                { "title": "city", visible:false },
                { "title": "country",visible:false },
                { "title": "pincode",visible:false },
                { "title": "occupation",visible:false },
                { "title": "religion" ,visible:false},
                { "title": "maritialStatus",visible:false },
                { "title": "BloodGroup",visible:false },
                { "title": "nationality" },
                ]
            })
        })
    },[])




    return <div  className="m-10 w-full bg-grey-700 overflow-x-scroll" > 
        <table className="usersTable w-[50%] block display  responsive nowrap cell-border hover " ref={tableRef} style={{width:"50% !important"}}></table>
    </div>
}


export default Table