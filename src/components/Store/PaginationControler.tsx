"use client"

import { useState, useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControllerProps {
  totalPages: number
  currentPage?: number
  onPageChange?: (page: number) => void
  siblingCount?: number
}

export function PaginationController({
  totalPages,
  currentPage = 1,
  onPageChange = () => {},
  siblingCount = 1,
}: PaginationControllerProps) {
  const [activePage, setActivePage] = useState(currentPage)

  useEffect(() => {
    setActivePage(currentPage)
  }, [currentPage])

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setActivePage(page)
    onPageChange(page)
  }

  // Genera el rango de páginas a mostrar
  const generatePaginationItems = () => {
    const firstPage = 1
    const lastPage = totalPages

    // Calcular el rango de páginas a mostrar alrededor de la página activa
    let startPage = Math.max(firstPage, activePage - siblingCount)
    let endPage = Math.min(lastPage, activePage + siblingCount)

    // Ajustar para mostrar siempre el mismo número de páginas
    const totalPageNumbers = siblingCount * 2 + 1
    if (endPage - startPage + 1 < totalPageNumbers) {
      if (startPage === firstPage) {
        endPage = Math.min(lastPage, firstPage + totalPageNumbers - 1)
      } else if (endPage === lastPage) {
        startPage = Math.max(firstPage, lastPage - totalPageNumbers + 1)
      }
    }

    const pages = []

    // Añadir primera página y elipsis si es necesario
    if (startPage > firstPage) {
      pages.push(
        <PaginationItem key="first">
          <PaginationLink
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              handlePageChange(firstPage)
            }}
          >
            {firstPage}
          </PaginationLink>
        </PaginationItem>,
      )

      if (startPage > firstPage + 1) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }
    }

    // Añadir páginas del rango
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === activePage}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              handlePageChange(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Añadir última página y elipsis si es necesario
    if (endPage < lastPage) {
      if (endPage < lastPage - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      pages.push(
        <PaginationItem key="last">
          <PaginationLink
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              handlePageChange(lastPage)
            }}
          >
            {lastPage}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              handlePageChange(activePage - 1)
            }}
            className={activePage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {generatePaginationItems()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              handlePageChange(activePage + 1)
            }}
            className={activePage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}