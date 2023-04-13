import { useEffect, useState } from 'react'
import axios from 'axios'

function AllFriends() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allSentFriendRequests, getSentFriendRequests] =
        useState<any>('')

    const config = {
        headers: {
            Authorization:
                `Bearer ` +
                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWQ0MiI6ImFtb250YXV0IiwiaWF0IjoxNjc4NDc4NDk5LCJleHAiOjE2Nzg1MTQ0OTl9.CW96cjbO-JeCbnLGCveXkIuflc4Wl33-SC6jY4zQI_8`,
        },
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`users/1/get_friends`, config)
                .then((response) => {
                    getSentFriendRequests(response.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.message)
                    setError(err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        fetchData()
    }, [])

    return (
        <div>
            <ul>
                {loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    allSentFriendRequests.friends?.map(
                        (request: any) => (
                            <li key={request.username}>
                                {request.username}, {request.id}
                            </li>
                        )
                        )}
                    </ul>
        </div>
    )
}

export default AllFriends