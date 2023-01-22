import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useGetCustomersQuery, useGetTransactionsQuery } from 'state/api'
import Header from 'components/Header'
import { useTheme } from '@mui/material'
import { Box } from '@mui/system'
import DataGridCustomToolbar from "components/DataGridCustomToolbar"


const Transactions = () => {
    const theme = useTheme();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("")

    const [searchInput, setSearchInput] = useState("")

    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    })
    // console.log("🚀 ~ file: index.js:22 ~ Transactions ~ data", data)

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },

    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Transactions" subtitle="list of transactions" />
            <Box height="80vh"
                mt="40px"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="Server"
                    sortingMode="Server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch }
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transactions