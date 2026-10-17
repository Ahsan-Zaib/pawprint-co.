import { useState } from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PetTypeSelect } from "@/components/site/PetTypeSelect";

afterEach(cleanup);

function PetForm() {
  const [pet, setPet] = useState("");
  return <><PetTypeSelect value={pet} onChange={setPet} /><output aria-label="Saved pet type">{pet}</output></>;
}

describe("Pet type entry", () => {
  it("accepts a species beyond dog, cat and other without replacing it", () => {
    render(<PetForm />);
    fireEvent.change(screen.getByRole("combobox", { name: "Pet type" }), { target: { value: "Chinchilla" } });
    expect(screen.getByLabelText("Saved pet type").textContent).toBe("Chinchilla");
  });
});