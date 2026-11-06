
const Footer = () => {
  return (
    <div className='bg-black text-white px-6 py-12 sm:px-4 md:px-12 lg:px-20 border-t border-white/10'>
        <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-4  gap-10 mb-10">
            <div>
                <ul className='space-y-2.5 text-2xl opacity-80'>
                    <li className='hover: opacity-100 cursor-pointer'>Link1</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link2</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link3</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link4</li>
                </ul>
            </div>
            <div>
                <ul className='space-y-2.5 text-2xl opacity-80'>
                    <li className='hover: opacity-100 cursor-pointer'>Link1</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link2</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link3</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link4</li>
                </ul>
            </div>
            <div>
                <ul className='space-y-2.5 text-2xl opacity-80'>
                    <li className='hover: opacity-100 cursor-pointer'>Link1</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link2</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link3</li>
                    <li className='hover: opacity-100 cursor-pointer'>Link4</li>
                </ul>
            </div>
            <div>
                <h3 className='font-semibold text-lg mb-4 uppercase'>Address</h3>
                <p className='text-sm opacity-80 leading-relaxed mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea magni earum dolorum placeat minus voluptate.</p>
            </div>
            
        </div>
        <div className='max-w-7xl mx-auto pt-4 border-t border-white/5 text-center md:flex md:justify-between md:text-left text-xl opacity-60'>
            <p className='mt-2 md:mt-0'>Lorem Epsium @2026</p>
        </div>
    </div>
  )
}

export default Footer