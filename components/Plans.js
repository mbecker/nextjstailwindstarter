import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { MailIcon, XCircleIcon } from '@heroicons/react/solid'

const plans = [
  {
    name: 'mats.becker@outlook.com',
    confirmed: false,
  },
  {
    name: 'mats.becker@gmail.com',
    confirmed: true,
  },
  {
    name: 'mats.becker@aol.com',
    confirmed: false,
  },
]

export default function Plans() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="w-full">
      <div className="mx-auto w-full">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan, index) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-sky-400'
                      : ''
                  }
                  ${
                    index === 1 ? 'bg-sky-600 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              index === 1 ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              index === 1 ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {plan.ram}/{plan.cpus}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{plan.disk}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      
                        <div className="shrink-0 flex flex-row space-x-1 text-white">
                        
                        
                          <button className='rounded-md inline-flex group items-center space-x-2 hover:bg-slate-100 hover:text-slate-600 text-slate-100 border border-slate-50/20 py-2 px-4'>
                            Delete
                            <XCircleIcon className="h-6 w-6 text-slate-100 ml-2 group-hover:text-slate-600" />
                          </button>
                          {/* <MailIcon className="h-6 w-6 text-slate-100" /> */}
                          
                          {/* <CheckIcon className="h-6 w-6" /> */}
                        
                        
                        </div>
                      
                     
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
