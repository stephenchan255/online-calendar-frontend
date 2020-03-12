import React from 'react';

export default function Header(props) {
  return (
    <div className="text-center my-2">
      <h1>{props.name}</h1>
    </div>
  );
}