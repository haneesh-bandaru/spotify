import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(1, "Age must be at least 1"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  date: z.string().min(1, "Date is required"),
  gender: z.enum(["male", "female", "others"], {
    invalid_type_error: "Gender is required",
  }),
  hobbies: z
    .array(z.string())
    .min(1, "At least one hobby must be selected")
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const Task2 = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: 0,
    email: "",
    password: "",
    date: "",
    gender: "",
    hobbies: [],
  });

  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        hobbies: checked
          ? [...prevData.hobbies, value]
          : prevData.hobbies.filter((hobby) => hobby !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: id === "age" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = formSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(validationResult.error);
      return;
    }

    setErrors(null);
    console.log("Form Data:", validationResult.data);
  };

  return (
    <div className="bg-slate-500 w-full">
      <form className="w-fit flex flex-col gap-4 p-10" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          {errors?.formErrors?.fieldErrors.name && (
            <p className="text-red-500">
              {errors.formErrors.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
          {errors?.formErrors?.fieldErrors.age && (
            <p className="text-red-500">
              {errors.formErrors.fieldErrors.age[0]}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors?.formErrors?.fieldErrors.email && (
            <p className="text-red-500">
              {errors.formErrors.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors?.formErrors?.fieldErrors.password && (
            <p className="text-red-500">
              {errors.formErrors.fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors?.formErrors?.fieldErrors.date && (
            <p className="text-red-500">
              {errors.formErrors.fieldErrors.date[0]}
            </p>
          )}
        </div>

        <div className="h-fit">
          <label htmlFor="gender">Gender</label>
          <br />
          <label>
            Male:
            <input
              id="gender"
              name="gender"
              type="radio"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Female:
            <input
              id="gender"
              name="gender"
              type="radio"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Others:
            <input
              id="gender"
              name="gender"
              type="radio"
              value="others"
              checked={formData.gender === "others"}
              onChange={handleChange}
            />
          </label>
          {errors?.formErrors?.fieldErrors.gender && (
            <p className="text-red-500">
              {errors.formErrors.fieldErrors.gender[0]}
            </p>
          )}
          <br />
        </div>

        <div className="flex gap-3">
          <label htmlFor="hobbies">Hobbies</label>
          <div>
            <label>
              Reading
              <input
                type="checkbox"
                value="reading"
                checked={formData.hobbies.includes("reading")}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Traveling
              <input
                type="checkbox"
                value="traveling"
                checked={formData.hobbies.includes("traveling")}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Gaming
              <input
                type="checkbox"
                value="gaming"
                checked={formData.hobbies.includes("gaming")}
                onChange={handleChange}
              />
            </label>
            <br />
          </div>
          {errors?.formErrors?.fieldErrors.hobbies && (
            <p className="text-red-500">
              {errors.formErrors.fieldErrors.hobbies[0]}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button type="submit">Submit</button>
          <button
            type="reset"
            onClick={() => {
              setFormData({
                name: "",
                age: 0,
                email: "",
                password: "",
                date: "",
                gender: "",
                hobbies: [],
              });
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Task2;
