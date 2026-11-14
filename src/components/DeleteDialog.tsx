'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


const DeleteDialogPage = ({ _id }: { _id: string }) => {
  const router = useRouter()
  const handleDelete = async () => {
    const token = await getTokenFromClient();
    const res = await fetch(`http://localhost:5000/upcoming-event/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    try {
      if (!res.ok) throw new Error('delete failed');
      const data = await res.json();
      toast.success('Event deleted successfully');
      router.push('/upcoming-event')

    } catch (error) {
      console.error(error);
      toast.error('Failed to delete event');
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button variant="destructive" className="flex-1 my-2">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure, want to delete this event?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose render={<Button
              onClick={handleDelete}
              type="submit">delete</Button>} />

          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteDialogPage;