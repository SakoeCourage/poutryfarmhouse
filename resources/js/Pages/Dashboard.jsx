import React from 'react'
import { AcessControl } from '../authorization/AcessControl'

export default function Dashboard() {
  return (
    <div>Dashboard
      
      <AcessControl abilities={['delete flock']}>
        <div>   heey im heer</div>
      </AcessControl>

    </div>
  )
}
