
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email || !password || !username) {
        throw new Error("Please fill in all fields");
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }
      
      // Validate password strength
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      if (data?.user) {
        toast({
          title: "Account created!",
          description: "Check your email for the confirmation link.",
        });
        
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          toast({
            description: "Please check your email to confirm your account before signing in.",
          });
        } else {
          // Auto sign-in if email confirmation is not required
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!signInError) {
            navigate("/");
          }
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF2F4] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <img 
              src="/lovable-uploads/1ddbc9ac-594a-40a0-9455-adc4fd3f8ac4.png" 
              alt="Pre-PregnancyGuide Logo" 
              className="h-16 w-16 mx-auto mb-4"
            />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text mb-2">
            Pre-PregnancyGuide
          </h1>
          <p className="text-gray-600">Your journey to a healthy pregnancy starts here</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/50"
                  />
                  <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-pink-400 text-white" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white/50"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/50"
                  />
                  <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                  <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-pink-400 text-white" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
