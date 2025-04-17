"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { X, UserCircle2, Wallet, LogOut, ChevronDown, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useConnect, useAccount, type Connector, useDisconnect } from "@starknet-react/core"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { connectors, connectAsync } = useConnect()
  const { account, isConnected } = useAccount()

  const handleConnect = async (connector: Connector) => {
    await connectAsync({ connector })
    setIsOpen(false)
  }

  return (
    <motion.nav
      className="sticky top-0 z-30 w-full border-b border-[#1c1f26] bg-[#0d1117]/80 backdrop-blur-lg px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-extrabold">
            <span className="bg-gradient-to-r from-[#887fb1] to-[#c79898] bg-clip-text text-transparent">
                Counter
            </span>
          </h1>
        </motion.div>

        {isConnected && account ? (
          <ProfileBar address={account.address} isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
        ) : (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="px-4 md:px-6 py-2.5 text-base font-bold bg-gradient-to-r from-[#5C94FF] to-[#FC8181] rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </span>
          </motion.button>
        )}
      </div>

      <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-black/60 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#0e111a] p-6 shadow-xl border border-[#1c1f26] overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Background glow effects */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-xl font-bold text-white">Connect Wallet</Dialog.Title>
                    <Dialog.Close asChild>
                      <motion.button
                        className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-white/10 transition-colors"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </Dialog.Close>
                  </div>

                  <p className="text-sm text-gray-400 mb-6">Choose a wallet to connect to Starknet</p>

                  <div className="space-y-3">
                    {connectors.map((connector, index) => (
                      <motion.button
                        key={connector.id}
                        onClick={() => handleConnect(connector)}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5C94FF]/90 to-[#5C94FF]/70 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-between group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{connector.name}</span>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </motion.nav>
  )
}

function ProfileBar({
  address,
  isOpen,
  setIsOpen,
}: {
  address: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { disconnect } = useDisconnect()

  // Format address to show first 6 and last 4 characters
  const formattedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#2d2f36] bg-[#1c1f26] hover:bg-[#252830] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <UserCircle2 className="w-5 h-5 text-[#5C94FF]" />
        <span className="text-sm font-medium hidden sm:inline">{formattedAddress}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1c1f26] border border-[#2d2f36] shadow-xl overflow-hidden z-50"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 border-b border-[#2d2f36]">
              <p className="text-xs text-gray-400">Connected as</p>
              <p className="text-sm font-medium text-white truncate">{address} disconnect</p>
            </div>
            <motion.button
              className="w-full flex items-center gap-2 p-3 text-left text-sm text-white hover:bg-[#252830] transition-colors"
              onClick={() => {
                disconnect()
                setIsOpen(false)
              }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <LogOut className="w-4 h-4 text-red-400" />
              Disconnect
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
