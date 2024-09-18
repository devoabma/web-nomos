import { motion } from 'framer-motion'
import { FileSearch } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFoundLawyer() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="mb-8 inline-block"
        >
          <FileSearch className="h-24 w-24 text-gray-400" />
        </motion.div>
        <h1 className="mb-2 text-4xl font-bold text-gray-800">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Página Não Encontrada
        </h2>
        <p className="mx-auto mb-8 max-w-md text-gray-600">
          Ops! Parece que você se perdeu. Esta página não existe no nosso
          sistema.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild className="bg-primary text-white">
            <Link to="/">Voltar para a Página Inicial</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
