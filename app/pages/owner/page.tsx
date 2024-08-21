"use client";
import { Dishes } from '@/app/modal/dish';
import React, { useEffect, useState } from 'react';
import { fetchDishByRestaurantId } from '@/app/service/dish';
import { useForm, useWatch, useFieldArray, Control } from 'react-hook-form';

type FormValues = {
  dishes: Dishes[];
};

const ConditionField = ({
  control,
  index,
  register,
}: {
  control: Control<FormValues>;
  index: number;
}) => {
  const output = useWatch({
    name: 'dishes',
    control,
  });

  return (
    <>
      {output[index]?.name === "special" && (
        <input
          {...register(`dishes[${index}].specialNote`)}
          placeholder="Special Note"
        />
      )}
      <input
        {...register(`dishes[${index}].easyConditional`)}
        style={{ display: output[index]?.name === "special" ? "block" : "none" }}
      />
    </>
  );
};

const DishForm: React.FC<{ restaurantId: string }> = ({ restaurantId }) => {
  const [dishes, setDishes] = useState<Dishes[]>([]);

  useEffect(() => {
    async function getDishByRestaurantId(restaurantId: string) {
      try {
        const data = await fetchDishByRestaurantId(restaurantId);
        console.log(data, "my dishes");
        setDishes(data.data);
      } catch (error) {
        console.log("fetching Menu error", error);
      }
    }
    getDishByRestaurantId(restaurantId);
  }, [restaurantId]);

  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      dishes: dishes, // Set fetched dishes as default values
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dishes',
  });

  const onSubmit = (data: FormValues) => console.log(data);

  useEffect(() => {
    if (dishes.length > 0) {
      // Reset the form with fetched dishes once they are loaded
      reset({ dishes });
    }
  }, [dishes]);

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((dish, index) => (
          <div key={dish.id}>
            <input
              className="py-3 px-6 text-left text-sm font-medium tracking-wider"
              {...register(`dishes[${index}].name`)}
              placeholder="Name"
            />
            <input
              className="py-3 px-6 text-left text-sm font-medium tracking-wider"
              {...register(`dishes[${index}].description`)}
              placeholder="Description"
            />
            <input
              className="py-3 px-6 text-left text-sm font-medium tracking-wider"
              {...register(`dishes[${index}].price`)}
              placeholder="Price"
            />
            <ConditionField control={control} register={register} index={index} />
            <button type="button" onClick={() => remove(index)}>
              Remove Dish
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ name: '', description: '', price: '' })}
        >
          Add Dish
        </button>
        <input type="submit" />
      </form>
    </div>
  );
};

export default DishForm;
