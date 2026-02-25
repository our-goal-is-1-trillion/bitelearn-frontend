import { useState } from "react"
import Quiz from "./Quiz"
import Result from "./Result"

export default function App() {
  const [isResultPage, setIsResultPage] = useState(false)

  if (isResultPage) {
    return <Result />
  }

  return <Quiz onResultPageMove={() => setIsResultPage(true)} />
}
