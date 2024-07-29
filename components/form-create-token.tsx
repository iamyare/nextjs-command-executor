"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getTokensByUser, InsertToken } from "@/actions";
import { Button } from "./ui/button";
export default function FormCreateToken({
  userId,
  className,
}: {
  userId: string;
  className?: string;
}) {

  const [token, setToken] = useState<Token[] | null>([]);

  interface TokenInsert {
    created_at?: string;
    id?: string;
    user_id: string;
  }

  useEffect(() => {
    async function generateToken() {
      const data: TokenInsert = { user_id: userId };
      const { tokenInsertError } = await InsertToken({ data });
      if (tokenInsertError) {
        console.log(tokenInsertError);
        return;
      }
    }
    generateToken();
  }, [userId]);

  useEffect(() => {
    async function getTokens() {
      const { tokens, tokensError } = await getTokensByUser({ userId: userId })
      if (tokensError) {
        console.log(tokensError)
        return
      }
      setToken(tokens);
    }
    getTokens();
  }, [userId]);

  return (
    <>
      <div className='grid gap-4 py-4'>
        <div className='grid items-center grid-cols-4 gap-4'>
          <div className='text-right'>Token</div>
          <div className='col-span-3 flex items-center gap-2'>
            <Input id='token' value={token?.[0]?.id ?? ''} className='flex-1' readOnly />
          </div>
        </div>
        <div className='flex w-full justify-end'>
          <Button variant="outline" onClick={() => navigator.clipboard.writeText(token?.[0]?.id ?? '')}>
            Copiar Token
          </Button>
        </div>
      </div>
    </>
  );
}