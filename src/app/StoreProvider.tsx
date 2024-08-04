'use client'
import { Provider } from "react-redux"
import { AppStore,createStore } from "@/lib/store/store" 
import { ReactNode, useRef } from "react"

export default function StoreProvider({children}:{children:ReactNode}){
    const storeRef = useRef<AppStore>();
    if(!storeRef.current){
        storeRef.current = createStore();
        
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}