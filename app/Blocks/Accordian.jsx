"use client"

import { useState } from "react"

const Accordian = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const questions = [
    {
      question: "What is Scrivo ?",
      answer:
        "Scrivo is a project management and team collaboration platform designed to help teams plan and track projects efficiently.",
    },
    {
      question: "Does Scrivo support agile model ?",
      answer:
        "Yes. Scrivo supports Scrum and Kanban boards , backlog management , sprint planning and burndown charts.",
    },
    {
      question: "Is Scrivo free ?",
      answer:
        "Yes. Scrivo offers a completely free plan with all essential features.",
    },
    {
      question: "Is my data secure on Scrivo ?",
      answer:
        "Scrivo uses industry standard encryption , secure cloud hosting and role based access to keep your data safe.",
    },
  ]

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const DownArrow = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  )

  const UpArrow = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  )

  return (
    <div className="mt-22 space-y-4">
      <h2 className="sm:text-4xl text-3xl font-bold mb-8 ml-1 font-mono">
        Some Questions
      </h2>
      {questions.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-md">
          <button
            onClick={() => toggle(index)}
            className="w-full text-left px-4 py-3 flex justify-between items-center [font-family:var(--font-geist-sans)]">
            <span className="font-medium text-[17px] sm:text-[15px]">
              {item.question}
            </span>
            <span className="ml-2">
              {openIndex === index ? UpArrow : DownArrow}
            </span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-[14px] sm:text-[14px] text-gray-600 dark:text-gray-300 [font-family:var(--font-geist-sans)] sm:font-semibold font-medium text-justify">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Accordian
