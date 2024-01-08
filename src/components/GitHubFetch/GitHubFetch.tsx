import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./GitHubFetch.css"

interface Repositories {
  html_url: string
  name: string
}

const GitHubFetch = () => {
  const { username } = useParams()
  const [avatarUrl, setAvatarUrl] = useState("")
  const [login, setLogin] = useState(username)
  const [id, setId] = useState(-1)
  const [createdAt, setCreated_at] = useState("")
  const [repositories, setRepositories] = useState<Repositories[]>([])
  const [followers, setFollowers] = useState(0)
  const [loginUrl, setLoginUrl] = useState("")
  const [isExists, setIsExists] = useState(false)

  const fetchData = async () => {
    try {
      let response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      )

      setIsExists(true)

      console.log("response", response.data)
      setRepositories(response.data)

      response = await axios.get(`https://api.github.com/users/${username}`)

      console.log("response", response.data)

      setAvatarUrl(response.data.avatar_url)
      setLogin(response.data.login)
      setId(response.data.id)
      setCreated_at(response.data.created_at)
      setFollowers(response.data.followers)
      setLoginUrl(response.data.html_url)

      //
    } catch (error) {
      console.error("Error fetching GitHub repos:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const nav = useNavigate()

  const goHome = () => {
    nav("/")
  }

  return (
    <>
      <div className="container">
        <div className="center" style={{ marginTop: "3%" }}>
          <button className="btn" onClick={goHome}>
            Back
          </button>
        </div>
        {isExists ? (
          <>
            <div className="row">
              <img
                onClick={() => (window.location.href = loginUrl)}
                className="col s3"
                style={{ marginTop: 20, cursor: "pointer" }}
                src={avatarUrl}
                alt=""
              />

              <div className="col s9">
                <div className="row">
                  <h3
                    style={{ cursor: "pointer" }}
                    className="col s12"
                    onClick={() => (window.location.href = loginUrl)}
                  >
                    {login}
                  </h3>{" "}
                  <h4 className="col s12">followers : {followers}</h4>
                  <h5 className="col s4">ID : {id}</h5>
                  <h5 className="col s8">Created at : {createdAt}</h5>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <h4>Repositories :</h4>
                <div className="row">
                  {repositories.map((r, i) => (
                    <div
                      className="rep-item col s6"
                      key={i}
                      onClick={() => (window.location.href = r.html_url)}
                    >
                      <h4>{r.name.substring(0, 19)}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="center">
            <h2>Doesn't exists</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default GitHubFetch
