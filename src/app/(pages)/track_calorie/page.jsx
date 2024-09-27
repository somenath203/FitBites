import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"


const page = () => {
  return (
    <div className="mt-14">

      <div className="flex flex-col m-auto items-center gap-5 w-5/6">

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Calorie Tracker
        </p>

        <form className="flex flex-col gap-6 w-full">

          <div className="flex flex-col gap-2">

            <Label>What did you eat today?</Label>

            <Textarea 
              placeholder="describe what you eat today in details" 
              rows={6} 
              className="!resize-none border border-green-600"
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>How is your nutrition and fitness progress going?</Label>

            <Textarea 
              placeholder="describe briefly your thoughts on your meal plans, energy levels, or weight changes" 
              rows={6} 
              className="!resize-none border border-green-600"
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>What nutrients did you have today?</Label>

            <Textarea 
              placeholder="briefly list your carbs, proteins, fats, and vitamins" 
              rows={6} 
              className="!resize-none border border-green-600"
            />

          </div>


          <Button type="submit" className="py-6 flex items-center gap-1">

            <span className="text-2xl">✨</span>

            <span>Track my Calorie</span>

          </Button>


        </form>

      </div>
      
    </div>
  );
};

export default page;
