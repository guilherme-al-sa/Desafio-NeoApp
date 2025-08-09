import React from "react";

export default function Pagination({page, totalPages, onChange}){
 return(
  <div className="pagination">
   <button onClick={() =>onChange(page - 1)} disabled={page <=0}>Anterior</button>
   <span>Página {page+1} de {totalPages || 1}</span>
   <button onClick={()=> onChange(page+1)} disabled={page+1>=totalPages}>Proxima</button>
  </div>
 );
}