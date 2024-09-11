"use client";
import { useState,ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "./ui/label"

export default function PasswordGenerator(){
    const [length,setLength] = useState<number>(16)
    const [includeUpperCase,setIncludeUpperCase] = useState<boolean>(true)
    const [includeLowerCase,setIncludeLowerCase] = useState<boolean>(true)
    const [includeNumbers,setIncludeNumbers] = useState<boolean>(true)
    const [includeSymbols,setIncludeSymbols] = useState<boolean>(true)
    const [password,setPassword] = useState<string>("")

    const handleLengthChange = (e:ChangeEvent<HTMLInputElement>):void =>{
        setLength(Number(e.target.value))
    }

    
    

    const handleCheckBoxChange = (setter:(value:boolean)=>void) => (checked:CheckedState):void => {
        if(typeof checked === "boolean"){
            setter(checked)
        }
    }

    const generatePassword = ():void => {
        if(length > 32){
            alert("length must be < 33")
            setLength(0)
            return
        }else{
            const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
            const numberChars = "0123456789"
            const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?"
    
            let allChars = ""
    
            if(includeUpperCase) allChars += uppercaseChars
            if(includeLowerCase) allChars += lowercaseChars
            if(includeNumbers) allChars += numberChars
            if(includeSymbols) allChars += symbolChars
    
            if(allChars === ""){
                alert("Please Select at least one Character Type");
                return
            }
            let generatedPassword = ""
            for(let i = 0;i<length;i++){
                const randomIndex = Math.floor(Math.random()*allChars.length)
                generatedPassword += allChars[randomIndex] 
            }
            
    
            setPassword(generatedPassword)
        }
    }

    const copyToClipboard = ()=>{
        navigator.clipboard.writeText(password).then(
            () => {
                alert("Passwrod copied to clipboard")
            },(err) =>{
                alert("Failed to copy password to clipboard.")
            }
        )
    }

    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <div className="mx-auto max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Password Generator</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                             Create a secure password with just a few clicks.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                         <Label htmlFor="length">Password Length</Label>
                            <Input
                            type="number"
                            onChange={handleLengthChange}
                            value={length}
                            id="length"
                            className="w-full"
                            min="8"
                            max="32"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Include:</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                id="uppercase"
                                checked={includeUpperCase}
                                onCheckedChange={handleCheckBoxChange(setIncludeUpperCase)}
                                />
                                <Label htmlFor="uppercase">UpperCase Letters</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                id="lowercase"
                                checked={includeLowerCase}
                                onCheckedChange={handleCheckBoxChange(setIncludeLowerCase)}
                                />
                                <Label htmlFor="lowercase">LowerCase Letters</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                id="Numbers"
                                checked={includeNumbers}
                                onCheckedChange={handleCheckBoxChange(setIncludeNumbers)}
                                />
                                <Label htmlFor="Numbers">Numbers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                id="symbols"
                                checked={includeSymbols}
                                onCheckedChange={handleCheckBoxChange(setIncludeSymbols)}
                                />
                                <Label htmlFor="symbols">Symbols</Label>
                            </div>
                        </div> 
                        <Button type="button" className="w-full" onClick={generatePassword} >
                            Generate Password
                        </Button>
                        <div className="space-y-2">
                            <Label htmlFor="password">Generated Password</Label>
                            <div className="flex items-center space-x-2">
                               <Input
                                id="password"
                                type="text"
                                value={password}
                                readOnly
                                className="flex-1"
                                />
                                <Button type="button" onClick={copyToClipboard}>Copy to Clipboard</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}