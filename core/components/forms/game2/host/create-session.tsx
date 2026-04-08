import { Dispatch, SetStateAction } from "react"
import SelectedCategories from "@/core/components/game2/selected-categories"
import Game2CategoryListing from "@/core/components/game2/category-listing"

export default function CreateGame2Session({ setCurrentStep }: { setCurrentStep: Dispatch<SetStateAction<number>> }) {
    return (
        <>
            <SelectedCategories />
            <Game2CategoryListing />
        </>
    )
}