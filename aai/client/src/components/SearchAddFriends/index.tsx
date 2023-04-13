import { useEffect, useState } from 'react'
import axios from 'axios'

function SearchInviteFriends() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allUsers, getAllUser] = useState<any>('')
    const [state, setstate] = useState<any>({
        query: '',
        list: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`/users/`)
                .then((response) => {
                    getAllUser(response.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.message)
                    setError(err.message)
                })
        }
        fetchData()
    }, [])

    const handleChange = (e: any) => {
        const results = allUsers.filter((post: any) => {
            if (e.target.value === '') return allUsers
            return post.username
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results,
        })
    }

    const config = {
        headers: {
            Authorization:
                `Bearer ` +
                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWQ0MiI6ImFtb250YXV0IiwiaWF0IjoxNjc4NDc4NDk5LCJleHAiOjE2Nzg1MTQ0OTl9.CW96cjbO-JeCbnLGCveXkIuflc4Wl33-SC6jY4zQI_8`,
        },
    }

    //find string
    function findId(usr: string) {
        for (let i = 0; i < allUsers.length; i++) {
            if (usr === allUsers[i].username) {
                return allUsers[i].id
            }
        }
    }

    function AddFriendButton(user: any) {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [sendFriendRequest, setSendFriendRequest] = useState(true)
        function addFriend() {
            setSendFriendRequest(!sendFriendRequest)
            const addId = findId(user)
            const fetchData = async () => {
                console.log(addId)
                setLoading(true)
                await axios
                    .post(
                        `/users/` + addId + `/add_friend_request`,
                        { withCredentials: true },
                        config
                    ) //2 got the friend request from the current user, e.g. 1.
                    .then((response) => {
                        //     getAllUser(response.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setError(err.message)
                    })
            }
            fetchData()
        }

        return (
            <div>
                {error && <p>{error}</p>}
                {!error && sendFriendRequest ? (
                    <button onClick={addFriend}>
                        Send friend request/Add friend
                    </button> ) : <p>Friend request sent!</p>
                }
            </div>
        )
    }

    function ViewAndCancel() {
        return (
            <div>
                <ul>
                {loading && <p>Loading ... </p>}
                    {!loading && error && <p>{error}</p>}
                    {!loading &&
                        !error && state.query === ''
                        ? ''
                        : state.list?.map((post: any) => {
                              return (
                                  <li key={post.username}>
                                      {post.username}, {post.id}
                                      {AddFriendButton(post.username)}
                                  </li>
                              )
                          })}
                </ul>
            </div>
        )
    }


    return (
        <div>
            <div>
                <form>
                    <input
                        onChange={handleChange}
                        value={state.query}
                        type="search"
                    />
                </form>
            </div>
            <ViewAndCancel />
        </div>
    )
}

export default SearchInviteFriends
