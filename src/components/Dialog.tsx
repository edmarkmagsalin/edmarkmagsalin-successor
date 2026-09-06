export const Dialog = ({ children, dialogRef }: { children: React.ReactNode; dialogRef: React.RefObject<HTMLDialogElement | null> }) => {
  return (
    <dialog
      ref={dialogRef}
      onCancel={() => dialogRef.current?.close()}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialogRef.current?.close()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          dialogRef.current?.close()
        }
      }}
      className='backdrop-bg fixed top-1/2 left-1/2 min-h-40 -translate-x-1/2 -translate-y-1/2 rounded-lg p-8 shadow-xl'
    >
      {children}
    </dialog>
  )
}