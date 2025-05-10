// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between">
        <p>&copy; {new Date().getFullYear()} E-Shop. Todos os direitos reservados.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Termos</a>
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="#" className="hover:underline">Contato</a>
        </div>
      </div>
    </footer>
  )
}