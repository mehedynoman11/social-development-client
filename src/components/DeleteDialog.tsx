'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"


const DeleteDialogPage = ({ _id }: { _id: string }) => {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/upcoming-event/${_id}`, {
      method: "DELETE",
    })
    try {
      if (!res.ok) throw new Error('delete failed');
      const data = await res.json();
      toast.success('Event deleted successfully');

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