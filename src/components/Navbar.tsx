import navbarIcon from "../assets/navbar-icon.svg";
const Navbar = () => {
  return (
    <div className='w-full bg-[#296573] items-center flex justify-around gap-24 text-white py-6'>
        <div>
          <h1 className='max-sm:text-[18px] text-[24px] font-bold font-[inter]'>Enos Weather Forecaster</h1>
        </div>
        <div >
          <img src={navbarIcon} alt="navbar-icon" className=''/>
        </div>
    </div>
  )
}

export default Navbar