import SwitchThemeBtn from "./components/SwitchThemeBtn"
import InputBoxes from "./components/InputBoxes"
import Calculate_Clear_Btn from "./components/Calculate_Clear_Btn"
import ResultDisplay from "./components/ResultDisplay"

export default function Home() {

  return (
    <main className="mx-auto mt-4 max-w-full">

      <div className="text-center text-3xl font-bold my-5 flex flex-col gap-4">
        Insulin Supply Calculator
      </div>

      <SwitchThemeBtn/>

      <InputBoxes/>

      <ResultDisplay/>

      <Calculate_Clear_Btn/>

    </main>
  )
}
