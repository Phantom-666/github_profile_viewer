import { useState } from "react"
import { useNavigate } from "react-router-dom"
import React from "react"
import axios from "axios"

const Home = () => {
  const [searchInput, setSearchInput] = useState("")
  const [accountExists, setAccountExists] = useState(false)
  const [checked, setChecked] = useState(false)

  const nav = useNavigate()

  const go = () => {
    nav(`/about/${searchInput}`)
  }

  const clearInput = () => {
    setSearchInput("")
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(false)
    setSearchInput(e.target.value)
  }

  const check = async () => {
    setChecked(true)

    try {
      await axios.get(`https://api.github.com/users/${searchInput}/repos`)

      setAccountExists(true)
    } catch (e) {
      setAccountExists(false)
    }
  }
  return (
    <div className="container">
      <div className="center">
        <h3>Search for account</h3>
        <nav style={{ marginTop: "7%" }}>
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input
                  value={searchInput}
                  onChange={(e) => inputChange(e)}
                  id="search"
                  type="search"
                  required
                />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
                <i onClick={clearInput} className="material-icons">
                  close
                </i>
              </div>
            </form>
          </div>
        </nav>
        {checked ? (
          <>
            {accountExists ? (
              <button style={{ marginTop: "3%" }} className="btn" onClick={go}>
                Go
              </button>
            ) : (
              <button
                disabled={!accountExists}
                className="btn"
                style={{ marginTop: "3%" }}
                onClick={check}
              >
                Check
              </button>
            )}
          </>
        ) : (
          <>
            <button className="btn" style={{ marginTop: "3%" }} onClick={check}>
              Check
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
