<?php

namespace App\Controller;

use App\Form\PhotoUploadType;
use App\Service\Uploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/photo", name="photo_")
 */
class PhotoController extends AbstractController
{
    /**
     * @Route("/upload", name="upload", methods={"POST"})
     */
    public function upload(Request $request, Uploader $uploader): JsonResponse
    {
        $form = $this->createForm(PhotoUploadType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var UploadedFile $uploadedFile */
            $uploadedFile = $form['file']->getData();

            $newFilename = $uploader->uploadPhoto($uploadedFile);
            return new JsonResponse(['ok' => true], 201);
        }

        $errors = $this->getErrorsFromForm($form);

        $responseData = [
            'type' => 'validation_error',
            'title' => 'There was a validation error',
            'errors' => $errors,
        ];

        return new JsonResponse($responseData, 400);
    }

    private function getErrorsFromForm(FormInterface $form): array
    {
        $errors = [];

        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }

        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }

        return $errors;
    }
}
