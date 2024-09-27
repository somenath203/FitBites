import Image from "next/image";

const page = () => {
  return (
    <div className="px-16 py-10">

      <p className="text-3xl text-center roboto-bold tracking-wider text-green-600 mb-6">
        Profile
      </p>

      <div className="flex flex-col gap-10 mt-10 text-lg">

        <div className="flex justify-center">

          <Image
            src="/dummy_person_photo.jpg"
            alt="profile image"
            width={100}
            height={100}
            className="rounded-full border-4 border-green-700 object-cover w-44 h-44 shadow-lg"
          />

        </div>

        <div className="flex flex-col gap-5">


          <div className="flex justify-between">

            <span className="font-semibold">Full Name:</span>

            <span>Somenath Choudhury</span>


          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Email Address:</span>

            <span>somenathchoudhury80@gmail.com</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Age:</span>

            <span>24 years</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Height:</span>

            <span>178 cm</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Weight:</span>
            
            <span>82 kg</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Dietary Preferences:</span>

            <span>Vegetarian</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Activity Level:</span>

            <span>Moderately Active</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Health Goal:</span>

            <span>Weight Loss</span>

          </div>


        </div>

      </div>
      
    </div>
  );
}

export default page;
