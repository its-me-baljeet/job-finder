'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { toast } from "sonner"

export default function CombinedLoginPage() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    async function handleLogin(){
        const res = await fetch("http://localhost:3000/api/login",{
            method: "POST",
            body : JSON.stringify({email, password})
        })
        const data = await res.json();
        if(data.success){
            toast.success("Logged in!")
            console.log(data.user)
        }else{
            console.log(data.message)
        }
    }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Tabs defaultValue="user" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        {/* User Login Form */}
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" value={email} type="email" placeholder="user@example.com" onChange={e=>setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="user-password">Password</Label>
                <Input id="user-password" value={password} type="password" onChange={e=>setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Admin Login Form */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Enter admin credentials for administrative access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" placeholder="admin@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="destructive">Login as Admin</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}