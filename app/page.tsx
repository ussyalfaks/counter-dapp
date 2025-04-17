"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import { useContract, useReadContract, useSendTransaction } from "@starknet-react/core"
import { COUNTER_ABI } from "../onchain/abi"
import { COUNTER_ABI_ADDRESS } from "../onchain/index"
import { ArrowDown, ArrowUp, RotateCcw, Loader2 } from "lucide-react"

export default function Counter() {
  const [count, setCount] = useState<string>("0")
  const [prevCount, setPrevCount] = useState<string>("0")
  const [inputValue, setInputValue] = useState<string>("")
  const [isIncreasing, setIsIncreasing] = useState<boolean>(false)

  const { sendAsync } = useSendTransaction({ calls: [] })
  const { contract } = useContract({
    abi: COUNTER_ABI,
    address: COUNTER_ABI_ADDRESS,
  })

  const { data, isFetching, refetch } = useReadContract({
    abi: COUNTER_ABI,
    address: COUNTER_ABI_ADDRESS,
    functionName: "get_count",
    args: [],
  })

 

  const increase = async () => {
    const calls = contract?.populate("increase", [])
    if (calls) {
      await sendAsync([calls])
      await refetch()
    }
  }

  const decrease = async () => {
    const calls = contract?.populate("decrease", [])
    if (calls) {
      await sendAsync([calls])
      await refetch()
    }
  }

  const reset = async () => {
    const calls = contract?.populate("reset_count", [])
    if (calls) {
      await sendAsync([calls])
      await refetch()
    }
  }

  const increaseBy = async () => {
    if (!inputValue) return
    const value = BigInt(inputValue)
    const calls = contract?.populate("increase_by", [value])
    if (calls) {
      await sendAsync([calls])
      await refetch()
      setInputValue("")
    }
  }

  const decreaseBy = async () => {
    if (!inputValue) return
    const value = BigInt(inputValue)
    const calls = contract?.populate("decrease_by", [value])
    if (calls) {
      await sendAsync([calls])
      await refetch()
      setInputValue("")
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      setPrevCount(count)
      setCount(data.toString())
      setIsIncreasing(Number(data) > Number(prevCount))
    }
  }, [data, count, prevCount])

  const counterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  }

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#131a29] text-white">
      <Navbar />
      <div className="px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-2xl bg-[#0e111a]/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-[#1c1f26] relative overflow-hidden"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          {/* Background glow effects */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

          <motion.h1
            className="text-5xl font-extrabold text-center mb-10 leading-snug"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Counter
          </motion.h1>

          <div className="flex flex-col items-center justify-center mb-12">
            <div className="relative h-32 flex items-center justify-center mb-8">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={count}
                  className="text-8xl font-bold absolute"
                  variants={counterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  // style={{
                  //   background: isIncreasing
                  //     ? "linear-gradient(to bottom, #4ADE80, #22c55e)"
                  //     : "linear-gradient(to bottom, #FC8181, #F56565)",
                  //   WebkitBackgroundClip: "text",
                  //   WebkitTextFillColor: "transparent",
                  // }}
                >
                  {count}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
              <motion.button
                onClick={increase}
                className="px-6 py-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg flex items-center justify-center gap-2 font-medium"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <ArrowUp className="w-5 h-5" />
                <span>+1</span>
              </motion.button>

              <motion.button
                onClick={decrease}
                className="px-6 py-4 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg flex items-center justify-center gap-2 font-medium"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <ArrowDown className="w-5 h-5" />
                <span>-1</span>
              </motion.button>

              <motion.button
                onClick={reset}
                className="px-6 py-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl shadow-lg flex items-center justify-center gap-2 font-medium"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </motion.button>
            </div>
          </div>

          <motion.div
            className="w-full flex flex-col md:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div className="flex-1 relative">
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-6 py-4 text-base md:text-lg bg-[#161b22] text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </motion.div>
            <div className="flex gap-4">
              <motion.button
                onClick={increaseBy}
                className="px-6 py-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg transition-all"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                Increase By
              </motion.button>
              <motion.button
                onClick={decreaseBy}
                className="px-6 py-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg transition-all"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                Decrease By
              </motion.button>
            </div>
          </motion.div>

          {isFetching && (
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin mr-2" />
              <p>Loading...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
