import React from 'react'

export default function Delete({setState,url}) {

    let confirmation = window.confirm('you sure you want to delete the admin');

  if (confirmation) {
    fetch(`${url}`, {
      method: 'DELETE',
    }).then((resp) => {
      resp.json();
    });

    window.location.reload();
  }
  return (
    <div>Delete</div>
  )
}
