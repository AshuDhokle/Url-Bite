import React from 'react'
import Link from 'next/link'
import { planI } from '@/app/utils/plans'
import { CiStar } from "react-icons/ci";

const Card : React.FC<any>  = ({plan,user})=> {
  console.log(user);
  console.log(plan.paymentLink);
  
  return (
    <div className=" self-center justify-self-center mt-2 mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-center">
          <div
            key={plan?.type}
            className="bg-white p-4 rounded-lg shadow-2xl border-2 border-x-cyan-400 border-y-sky-700"
          >
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {plan?.type}
            </h3>
            <div className="mt-4">
              <div className="flex items-baseline text-xl font-extrabold text-indigo-600">
                {plan?.price}
                <span className="ml-1 text-xl font-medium text-gray-500">
                  /{plan?.type === 'Monthly' ? 'mo' : 'yr' }
                </span>
              </div>
            </div>
            <ul className="mt-6 space-y-4">
              {plan?.features.map((feature:string,idx:number) => (
                <li key={idx} className="flex items-start">
                  <p className="flex flex-row items-center ml-3 text-xl leading-6 font-bold text-green-600">
                  <CiStar className='mx-2'/> {feature}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex flex-row items-center justify-center mt-2">
              
                <Link href={`${plan.paymentLink}${user?._id}`}
                  className='p-2 m-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md'
                >
                  Subscribe
                </Link>
            </div>
          </div>

    </div>

</div>
  )
}

export default Card