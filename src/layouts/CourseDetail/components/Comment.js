"use client";

import * as z from "zod";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";

const Button = ({ className, ...props }) => (
  <button
    className={`px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-200 rounded-3xl ${className}`}
    {...props}
  />
);

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 ${className}`}
    {...props}
  />
));

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 ${className}`}
    {...props}
  />
));
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={`form-checkbox h-5 w-5 rounded border-gray-300 focus:ring-orange-500 ${className}`}
    {...props}
  />
));

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  comment: z.string().min(10, {
    message: "Comment must be at least 10 characters.",
  }),
  saveDetails: z.boolean().default(false),
});

export default function CommentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      saveDetails: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    reset();
  };

  return (
    <div className="w-full max-w-2xl rounded-lg   ">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 " />
        <h2 className="text-2xl font-bold text-gray-800">Leave A Comment</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Your email address will not be published. Required fields are marked *
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} id="name" placeholder="Your name" />}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} id="email" type="email" placeholder="your@email.com" />
            )}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment *
          </label>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Textarea {...field} id="comment" rows={4} placeholder="Write your comment here..." />
            )}
          />
          {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="saveDetails"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="saveDetails"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <label htmlFor="saveDetails" className="text-sm text-gray-700">
            Save my name and email in this browser for the next time I comment
          </label>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </div>
  );
}
