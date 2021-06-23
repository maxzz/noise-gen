import React from 'react';
import { RadioGroup } from '@headlessui/react';

const plans = [
    {
        name: '2D',
        ram: '12GB',
        cpus: '6 CPUs',
        disk: '160 GB SSD disk',
    },
    {
        name: '3D',
        ram: '16GB',
        cpus: '8 CPUs',
        disk: '512 GB SSD disk',
    },
    {
        name: '4D',
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
                    <div className="flex space-x-1 px-2">
                        {plans.map((plan) => (
                            <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={
                                    ({ active, checked }) => `
                                        ${active ? 'ring-1 ring-offset-1 ring-offset-sky-300 ring-white ring-opacity-60' : ''}
                                        ${checked ? 'bg-sky-900 bg-white' : 'bg-purple-100'}
                                        relative text-[.6rem] rounded-lg px-2 py-0.5 cursor-pointer flex focus:outline-none
                                        border border-gray-500
                                        `
                                }
                            >
                                {plan.name}
                                {/* {({ active, checked }) => (
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
                                                    <CheckIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )} */}
                            </RadioGroup.Option>
                        ))}
                    </div>
            </RadioGroup>
        </div>
    );
}

export default NoiseEditor;
