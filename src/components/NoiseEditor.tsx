import React from 'react';
import { RadioGroup } from '@headlessui/react';

const plans = [
    {
        name: 'Startup',
        ram: '12GB',
        cpus: '6 CPUs',
        disk: '160 GB SSD disk',
    },
    {
        name: 'Business',
        ram: '16GB',
        cpus: '8 CPUs',
        disk: '512 GB SSD disk',
    },
    {
        name: 'Enterprise',
        ram: '32GB',
        cpus: '12 CPUs',
        disk: '1024 GB SSD disk',
    },
];

function NoiseEditor() {
    const [selected, setSelected] = React.useState(plans[0]);
    return (
        <div>
            <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                    {plans.map((plan) => (
                        <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={
                                ({ active, checked }) => `${active ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' : ''}
                                    ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                                >
                                                    {plan.name}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}
                                                >
                                                    <span>
                                                        {plan.ram}/{plan.cpus}
                                                    </span>{' '}
                                                    <span aria-hidden="true">&middot;</span>{' '}
                                                    <span>{plan.disk}</span>
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="flex-shrink-0 text-white">
                                                {/* <CheckIcon className="w-6 h-6" /> */}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}

export default NoiseEditor;
